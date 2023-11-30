
jsDesign.showUI(__html__, { width: 260, height: 120 });
const CACHE_KEY = 'history'
//监听从 插件ui 发过来的信息
jsDesign.ui.onmessage = msg => {
	if (!msg) return
	console.log('htm -> ui', msg)
	if (msg.type === 'addTag:action') {
		const { datas: { id } } = msg;
		if (!id) {
			jsDesign.notify("嘿，选个节点来玩玩吧！")
			return
		}
		const node = jsDesign.getNodeById(id)
		console.log('currentPage---', node, jsDesign.currentPage)
		if (!node) {
			jsDesign.notify("节点丢失在时空中，再次尝试寻找！")
			return
		}
		const { selection } = jsDesign.currentPage
		if (selection.length === 1) {
			const pluginDatas = node.getPluginData(CACHE_KEY)
			const cloneNode = node.clone()
			cloneNode.getPluginData(CACHE_KEY, '')
			if (!pluginDatas) {
				// const pageNode = jsDesign.createFrame()
				// pageNode.name = `时间线: ${cloneNode.name}`
				// pageNode.visible = false
				// pageNode.x = cloneNode.x
				// pageNode.y = cloneNode.y
				// pageNode.resize(cloneNode.width, cloneNode.height)
				cloneNode.name = `(${formatDate(new Date().getTime())})${node.name}`
				// cloneNode.x = 0
				// cloneNode.y = 0
				// console.log('	cloneNode.name ---', cloneNode.name)
				//调用jsDesignConstraints设置画板的宽高，子图层不会被等比缩放，
				// pageNode.resizeWithoutConstraints(cloneNode.width, cloneNode.height);
				jsDesign.currentPage.insertChild(0, cloneNode)
				// pageNode.appendChild(cloneNode)

				console.log('cloneNode---', jsDesign, cloneNode.id)
				console.log('node---', id)
			}
		} else {
			jsDesign.notify("嘿，选个节点来玩玩吧！")
		}
	}
};


jsDesign.on('selectionchange', () => {
	sendSelectNode()
})


jsDesign.on('run', () => {
	sendSelectNode()
})



function sendSelectNode() {
	const { selection } = jsDesign.currentPage
	if (selection.length === 1) {
		let status = true
		let currentSel = selection[0]
		let datas = null
		while (status) {
			const { name, id } = currentSel
			if (!currentSel.parent) {
				status = false
				datas = null
				break
			}
			if (currentSel.parent.type === 'PAGE') {
				status = false
				datas = { name, id }
				break
			}
			currentSel = currentSel.parent
		}
		jsDesign.ui.postMessage({
			type: 'selectionchange:commit',
			datas,
		})
	}
}



// 示例：将日期字符串转换为 "YYYY-MM-DD HH:mm" 格式
function formatDate(dateString) {
	// 创建一个新的 Date 对象
	const date = new Date(dateString);

	// 获取年、月、日、小时和分钟
	const year = date.getFullYear();
	const month = date.getMonth() + 1; // 注意：月份从 0 开始，因此需要加 1
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();

	// 补零（如果月、日、小时或分钟小于 10，则在前面添加一个 "0"）
	const paddedMonth = month < 10 ? '0' + month : month;
	const paddedDay = day < 10 ? '0' + day : day;
	const paddedHours = hours < 10 ? '0' + hours : hours;
	const paddedMinutes = minutes < 10 ? '0' + minutes : minutes;

	// 返回 "YYYY-MM-DD HH:mm" 格式的日期字符串
	return `${year}-${paddedMonth}-${paddedDay} ${paddedHours}:${paddedMinutes}`;
}
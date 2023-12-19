jsDesign.showUI(__html__, { width: 800, height: 740 });

/** 防抖 10s */
const optTime = 10000
let timer = null

const fix = '##_@@'

/** 上次修改元素id*/
let updateId = ''
/** 修改元素 最上级面板 id*/
let updatePageId = ''
/** 操作记录 */
const cacheData = {}


let updating = false

let currentId = ''
let currentName = ''



//监听从 插件ui 发过来的信息
jsDesign.ui.onmessage = msg => {
	if (msg.type === 'createLayer') {

	}
};

jsDesign.on('currentpagechange', () => {
	console.log('currentpagechange---', currentpagechange)
})


jsDesign.on('selectionchange', () => {
	const selection = jsDesign.currentPage.selection
	console.log('selectionchange--', selection)
	let currtOptId = '' // 记录操作id
	let optIdSet = new Set()
	currentName = ''
	let updateOptPageId = ''
	selection.forEach((node) => {
		// 操作id
		const { id: nid } = node
		const { id, name } = getParentNode(node)
		currtOptId = `${currtOptId}${fix}${nid}`
		updateOptPageId = `${updateOptPageId}${fix}${id}`
		currentName = name
		optIdSet.add(id)
	})
	currentId = ''
	if (optIdSet.size > 1) {
		currentId = ''
		jsDesign.ui.postMessage({
			type: 'cache:done',
			datas: [],
			id: '',
		})
	} else if (optIdSet.size === 1) {
		currentId = [...optIdSet][0]
		jsDesign.ui.postMessage({
			type: 'cache:done',
			datas: cacheData[currentId] || [],
			id: currentId,
			name: currentName,
		})
	}
	if (updateId === '') {
		updateId = currtOptId
		updatePageId = updateOptPageId
		return
	}

	// 切换节点
	if (updateId !== currtOptId) {
		if (updatePageId !== updateOptPageId) {
			if (updating) {
				// 记录下来
				clearTimeout(timer)
				handleReData(getUpdateNods(updatePageId))
				updating = false
			}
			updatePageId = updateOptPageId
		}
		updateId = currtOptId
	} else {
		// 修改了
		if (updateId === currtOptId) {
			console.log('------')
			updating = true
		}
	}


	if (timer) {
		clearTimeout(timer)
	}

	timer = setTimeout(async () => {
		console.log('setTimeout----')
		if (updating) {
			// 记录下来
			await handleReData(getUpdateNods(updatePageId))
			if (currentId) {
				jsDesign.ui.postMessage({
					type: 'cache:update',
					datas: cacheData[currentId][cacheData[currentId].length - 1],
					id: currentId,
					name: currentName,
				})
			}
			updating = false
		}
		clearTimeout(timer)
		timer = null
	}, optTime)

})

function getParentNode(node) {
	let { parent } = node
	let res = node
	while (parent.type !== 'PAGE') {
		res = parent
		parent = parent.parent
	}
	return res;
}

/** 获取上一次操作 */
function getUpdateNods(updateId) {
	const ids = updateId.split(fix)
	const result = []
	const mapid = {}
	ids.forEach(id => {
		const node = jsDesign.getNodeById(id)
		node && !mapid[id] && result.push(node);
		mapid[id] = 1
	})
	return result;
}

/** 操作记录 */
async function handleReData(selection) {
	const time = formatDate();
	let i = 0
	let len = selection.length
	for (i; i < len; i++) {
		const node = selection[i]
		const { id, width, height } = node
		if (!Array.isArray(cacheData[id])) {
			cacheData[id] = []
		}
		const base64 = jsDesign.base64Encode(await node.exportAsync());
		cacheData[id].push({
			time,
			base64,
			width,
			height
		})
	}
}

// 示例：将日期字符串转换为 "YYYY-MM-DD HH:mm:ss" 格式
function formatDate() {
	// 创建一个新的 Date 对象
	const date = new Date();

	// 获取年、月、日、小时和分钟
	const year = date.getFullYear();
	const month = date.getMonth() + 1; // 注意：月份从 0 开始，因此需要加 1
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const secondes = date.getSeconds()
	// 补零（如果月、日、小时或分钟小于 10，则在前面添加一个 "0"）
	const paddedMonth = month < 10 ? '0' + month : month;
	const paddedDay = day < 10 ? '0' + day : day;
	const paddedHours = hours < 10 ? '0' + hours : hours;
	const paddedMinutes = minutes < 10 ? '0' + minutes : minutes;
	const paddedSecondes = secondes < 10 ? '0' + secondes : secondes;

	// 返回 "YYYY-MM-DD HH:mm" 格式的日期字符串
	return `${year}-${paddedMonth}-${paddedDay} ${paddedHours}:${paddedMinutes}:${paddedSecondes}`;
}


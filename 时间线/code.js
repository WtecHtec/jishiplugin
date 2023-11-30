
jsDesign.showUI(__html__, { width: 300, height: 140 });
const CACHE_KEY = 'history'
let perviewNode = null
//监听从 插件ui 发过来的信息
jsDesign.ui.onmessage = msg => {
	if (!msg) return
	console.log('htm -> ui', msg)
  const { type, datas: { id, targetid } } = msg;
	if (type === 'addTag:action') {
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
      let plugin = {
        lines: [],
        soucer: null,
      }
      const time = formatDate(new Date().getTime())
			const pluginDatas = node.getPluginData(CACHE_KEY)
			const cloneNode = node.clone()
			// cloneNode.setPluginData(CACHE_KEY, '')
      cloneNode.visible = false
      cloneNode.locked = true
      cloneNode.name = `(${time})${node.name}`
      jsDesign.currentPage.insertChild(0, cloneNode)
      console.log('cloneNode---', jsDesign, cloneNode.id)
      console.log('node---', id)
			if (pluginDatas) {
        try {
          plugin = JSON.parse(pluginDatas)
        } catch (error) {
        }
			}
      try {
        plugin.lines.push({
          time,
          id: cloneNode.id,
          name: cloneNode.name
        })
        node.setPluginData(CACHE_KEY, JSON.stringify(plugin))
        cloneNode.setPluginData(CACHE_KEY, JSON.stringify({
          lines: [],
          soucer: node.id,
          soucername: node.name
        }))
      } catch (error) {
        
      }
		} else {
			jsDesign.notify("嘿，选个节点来玩玩吧！")
		}
	} else if (type === 'perview:action') {
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
    perviewNode = node
    jsDesign.currentPage.selection = [ node ]
  } else if (type === 'replace:action') {
    const fNode = jsDesign.getNodeById(targetid)
    const cNode = jsDesign.getNodeById(id)
    if (!fNode || !cNode) {
      jsDesign.notify("源节点丢失在时空中，再次尝试寻找！")
      return
    }
    fNode.children.forEach(child => {
      if (child) child.remove()
    })
    cNode.children.forEach(child => {
      if (child) {
        fNode.insertChild(0, child.clone())
      }
    })
    jsDesign.notify("覆盖成功！")
  }
};


jsDesign.on('selectionchange', (e) => {
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
    if (perviewNode && perviewNode.id === currentSel.id) return
    perviewNode = null
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
        const pluginDatas = currentSel.getPluginData(CACHE_KEY)
        let timeline = {
          lines: [],
          soucer: null,
        }
        if (pluginDatas) {
          try {
            timeline = JSON.parse(pluginDatas)
            const fNode = jsDesign.getNodeById(timeline.soucer)
            if (!fNode) timeline.soucer = null
          } catch (error) {
            
          }
        }
				datas = { name, id, timeline }
				break
			}
			currentSel = currentSel.parent
		}
		jsDesign.ui.postMessage({
			type: 'selectionchange:commit',
			datas,
		})
	} else {
    perviewNode = null
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

jsDesign.showUI(__html__, { width: 460, height: 500 });




let showType = 'text'
let renderPath = ''
let pathNode = ''
//监听从 插件ui 发过来的信息
jsDesign.ui.onmessage = msg => {
	const { type, nodeshowtype, settingDatas } = msg
	if (type === 'select:type') {
		showType = nodeshowtype
	} else if (type === 'setting:done') {
		if (nodeshowtype === 'text') {
			renderText(settingDatas)
		} else {
			renderNode(settingDatas)
		}
	}

};

function renderText(settingDatas) {
	const [datas, xDatas, yDatas, text, textColor] = settingDatas
	console.log(text, textColor)
	const frame = jsDesign.createFrame()
	frame.name = text
	frame.fills = [{
		type: "SOLID", opacity: 0, color: {
			b: 1,
			g: 1,
			r: 1,
		}
	}]
	frame.resize(renderPath.width, renderPath.height)
	datas.forEach((value, index) => {
		const textNode = jsDesign.createText()
		textNode.characters = value
		textNode.fontSize = 32
		textNode.x = pathNode.x + xDatas[index]
		textNode.y = pathNode.y + yDatas[index]
		textNode.fills = [{
			type: "SOLID", opacity: 1, color: hexToRgba(textColor)
		}]
		frame.appendChild(textNode);
	})
	renderPath.appendChild(frame)
	pathNode.visible = false


}

function renderNode(settingDatas) {

}


/**
 * 检测是否修改 是当前 选择节点id
 * 更新得节点是 选择节点的父级面板的内容
 */
jsDesign.on('selectionchange', async () => {

	const selection = jsDesign.currentPage.selection[0]
	console.log('selectionchange--', selection.type, selection, selection.vectorPaths)
	if (!selection) return
	if (showType === 'text' && selection.type === 'VECTOR'
		&& selection.vectorPaths
		&& selection.vectorPaths.length === 1
		&& selection.vectorPaths[0].data) {
		jsDesign.ui.postMessage({
			type: 'select:done',
			datas: selection.vectorPaths[0].data,
			rect: [selection.width, selection.height]
		})
		pathNode = selection
		renderPath = selection.parent
	} else if (showType === 'node') {
		const base64 = jsDesign.base64Encode(await selection.exportAsync());
		jsDesign.ui.postMessage({
			type: 'select:done',
			datas: base64,
			name: selection.name,
		})
	}
})


function hexToRgba(hex) {
	return {
		r: parseInt("0x" + hex.slice(1, 3)),
		g: parseInt("0x" + hex.slice(3, 5)),
		b: parseInt("0x" + hex.slice(5, 7)),
	}
}
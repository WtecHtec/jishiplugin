
jsDesign.showUI(__html__, { width: 300, height: 400 });
const MeasurMap = {
	left: drawLeft,
	right: drawRight,
	top: drawTop,
	bottom: drawBottom
}

//监听从 插件ui 发过来的信息
jsDesign.ui.onmessage = msg => {
	if (msg.type === 'setting:done' && msg.datas) {
		const { measur, } = msg.datas
		const selection = jsDesign.currentPage.selection
		const drawFn = MeasurMap[measur]
		if (selection && selection.length && typeof drawFn === 'function') {
			console.log(selection)

			selection.forEach(item => {
				drawFn(item, msg)
			})
			//调用scrollAndZoomIntoView方法将创建的 节点 居中并以最佳缩放比展示
			// jsDesign.viewport.scrollAndZoomIntoView(nodes);
		} else {
			jsDesign.notify('嘿，麻烦选择节点。')
		}
	}

};

function drawBottom(item, msg) {
	const parent = getParent(item)
	if (!parent) return
	const { space, color, fontsize } = msg.datas
	const { x, y, width, height, absoluteBoundingBox } = item
	console.log(x, y, width, height, absoluteBoundingBox)
	// const frame = jsDesign.createFrame()
	let nodes = []
	const topLine = jsDesign.createLine()
	topLine.x = 0
	topLine.y = -20
	// topLine.width = 20
	topLine.rotation = 90
	topLine.strokes = [{
		type: "SOLID", opacity: 1, color: hexToRgba(color)
	}]
	topLine.resizeWithoutConstraints(20, 1)
	nodes.push(topLine)

	const botomLine = jsDesign.createLine()
	botomLine.x = width
	botomLine.y = -20
	botomLine.rotation = 90
	// topLine.width = 20
	botomLine.strokes = [{
		type: "SOLID", opacity: 1, color: hexToRgba(color)
	}]
	botomLine.resizeWithoutConstraints(20, 1)
	nodes.push(botomLine)


	const vLine = jsDesign.createLine()
	vLine.x = 0
	vLine.y = -30
	// topLine.width = 20
	vLine.strokes = [{
		type: "SOLID", opacity: 1, color: hexToRgba(color)
	}]
	vLine.resizeWithoutConstraints(width, 1)
	nodes.push(vLine)


	const text = jsDesign.createText()
	text.characters = `${width}`
	text.fontSize = fontsize
	text.fills = [{
		type: "SOLID", opacity: 1, color: hexToRgba(color)
	}]
	nodes.push(text)
	text.y = -30 + 4
	text.x = vLine.x + width / 2

	const gNode = jsDesign.group(nodes, jsDesign.currentPage)
	if (item.id === parent.id) {
		gNode.x = parent.absoluteBoundingBox.x
		gNode.y = parent.absoluteBoundingBox.y + space + height
	} else {
		gNode.x = parent.absoluteBoundingBox.x + x
		gNode.y = parent.absoluteBoundingBox.y + y + space + height
	}

	gNode.name = '轮廓标记'
	jsDesign.currentPage.appendChild(gNode)

}

function drawTop(item, msg) {
	const parent = getParent(item)
	if (!parent) return
	const { space, color, fontsize } = msg.datas
	const { x, y, width, height, absoluteBoundingBox } = item
	console.log(x, y, width, height, absoluteBoundingBox)
	// const frame = jsDesign.createFrame()
	let nodes = []
	const topLine = jsDesign.createLine()
	topLine.x = 0
	topLine.y = -20
	// topLine.width = 20
	topLine.rotation = 90
	topLine.strokes = [{
		type: "SOLID", opacity: 1, color: hexToRgba(color)
	}]
	topLine.resizeWithoutConstraints(20, 1)
	nodes.push(topLine)

	const botomLine = jsDesign.createLine()
	botomLine.x = width
	botomLine.y = -20
	botomLine.rotation = 90
	// topLine.width = 20
	botomLine.strokes = [{
		type: "SOLID", opacity: 1, color: hexToRgba(color)
	}]
	botomLine.resizeWithoutConstraints(20, 1)
	nodes.push(botomLine)


	const vLine = jsDesign.createLine()
	vLine.x = 0
	vLine.y = -30
	// topLine.width = 20
	vLine.strokes = [{
		type: "SOLID", opacity: 1, color: hexToRgba(color)
	}]
	vLine.resizeWithoutConstraints(width, 1)
	nodes.push(vLine)


	const text = jsDesign.createText()
	text.characters = `${width}`
	text.fontSize = fontsize
	text.fills = [{
		type: "SOLID", opacity: 1, color: hexToRgba(color)
	}]
	nodes.push(text)
	text.y = -30 - text.height - 4
	text.x = vLine.x + width / 2

	const gNode = jsDesign.group(nodes, jsDesign.currentPage)
	if (item.id === parent.id) {
		gNode.x = parent.absoluteBoundingBox.x
		gNode.y = parent.absoluteBoundingBox.y - space - 20
	} else {
		gNode.x = parent.absoluteBoundingBox.x + x
		gNode.y = parent.absoluteBoundingBox.y + y - space - 20
	}

	gNode.name = '轮廓标记'
	jsDesign.currentPage.appendChild(gNode)

}


function drawRight(item, msg) {
	const parent = getParent(item)
	if (!parent) return
	const { space, color, fontsize } = msg.datas
	const { x, y, width, height, absoluteBoundingBox } = item
	console.log(x, y, width, height, absoluteBoundingBox)
	// const frame = jsDesign.createFrame()
	let nodes = []
	const topLine = jsDesign.createLine()
	topLine.x = 0
	topLine.y = 0
	// topLine.width = 20
	topLine.strokes = [{
		type: "SOLID", opacity: 1, color: hexToRgba(color)
	}]
	topLine.resizeWithoutConstraints(20, 1)
	nodes.push(topLine)

	const botomLine = jsDesign.createLine()
	botomLine.x = 0
	botomLine.y = height
	// topLine.width = 20
	botomLine.strokes = [{
		type: "SOLID", opacity: 1, color: hexToRgba(color)
	}]
	botomLine.resizeWithoutConstraints(20, 1)
	nodes.push(botomLine)


	const vLine = jsDesign.createLine()
	vLine.x = 10
	vLine.y = height
	vLine.rotation = 90
	// topLine.width = 20
	vLine.strokes = [{
		type: "SOLID", opacity: 1, color: hexToRgba(color)
	}]
	vLine.resizeWithoutConstraints(height, 1)
	nodes.push(vLine)


	const text = jsDesign.createText()
	text.characters = `${height}`
	text.fontSize = fontsize
	text.fills = [{
		type: "SOLID", opacity: 1, color: hexToRgba(color)
	}]
	nodes.push(text)
	text.y = height / 2 - text.height / 2
	text.x = vLine.x + 4

	const gNode = jsDesign.group(nodes, jsDesign.currentPage)
	if (item.id === parent.id) {
		gNode.x = parent.absoluteBoundingBox.x + space + width
		gNode.y = parent.absoluteBoundingBox.y
	} else {
		gNode.x = parent.absoluteBoundingBox.x + x + space + width
		gNode.y = parent.absoluteBoundingBox.y + y
	}
	gNode.name = '轮廓标记'
	jsDesign.currentPage.appendChild(gNode)

}

function drawLeft(item, msg) {
	const parent = getParent(item)
	if (!parent) return
	const { space, color, fontsize } = msg.datas
	const { x, y, width, height, absoluteBoundingBox } = item
	console.log(x, y, width, height, absoluteBoundingBox)
	// const frame = jsDesign.createFrame()
	let nodes = []
	const topLine = jsDesign.createLine()
	topLine.x = 0
	topLine.y = 0
	// topLine.width = 20
	topLine.strokes = [{
		type: "SOLID", opacity: 1, color: hexToRgba(color)
	}]
	topLine.resizeWithoutConstraints(20, 1)
	nodes.push(topLine)

	const botomLine = jsDesign.createLine()
	botomLine.x = 0
	botomLine.y = height
	// topLine.width = 20
	botomLine.strokes = [{
		type: "SOLID", opacity: 1, color: hexToRgba(color)
	}]
	botomLine.resizeWithoutConstraints(20, 1)
	nodes.push(botomLine)


	const vLine = jsDesign.createLine()
	vLine.x = 10
	vLine.y = height
	vLine.rotation = 90
	// topLine.width = 20
	vLine.strokes = [{
		type: "SOLID", opacity: 1, color: hexToRgba(color)
	}]
	vLine.resizeWithoutConstraints(height, 1)
	nodes.push(vLine)


	const text = jsDesign.createText()
	text.characters = `${height}`
	text.fontSize = fontsize
	text.fills = [{
		type: "SOLID", opacity: 1, color: hexToRgba(color)
	}]
	nodes.push(text)
	text.y = height / 2 - text.height / 2
	text.x = vLine.x - text.width - 4

	const gNode = jsDesign.group(nodes, jsDesign.currentPage)
	if (item.id === parent.id) {
		gNode.x = parent.absoluteBoundingBox.x - 20 - space
		gNode.y = parent.absoluteBoundingBox.y
	} else {
		gNode.x = parent.absoluteBoundingBox.x + x - 20 - space
		gNode.y = parent.absoluteBoundingBox.y + y
	}
	gNode.name = '轮廓标记'
	jsDesign.currentPage.appendChild(gNode)

}

function hexToRgba(hex) {
	return {
		r: parseInt("0x" + hex.slice(1, 3)) / 255,
		g: parseInt("0x" + hex.slice(3, 5)) / 255,
		b: parseInt("0x" + hex.slice(5, 7)) / 255,
	}
}


function getParent(node) {
	let parent = null
	if (node) {
		while (node.parent) {
			if (node.parent.type === 'PAGE') {
				parent = node
				return parent
			}
			node = node.parent
		}
		return parent
	}
	return parent
}


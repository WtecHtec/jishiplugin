
jsDesign.showUI(__html__, { width: 500, height: 600 });

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
  const [datas, xDatas, yDatas, text, textColor, fontSize] = settingDatas
  console.log(text, textColor, hexToRgba(textColor))
  const frame = jsDesign.createFrame()
  const nodes = []
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
    textNode.fontSize = fontSize
    textNode.x = pathNode.x + xDatas[index]
    textNode.y = pathNode.y + yDatas[index]
    textNode.fills = [{
      type: "SOLID", opacity: 1, color: hexToRgba(textColor)
    }]
    nodes.push(textNode)
    // frame.appendChild(textNode);
  })
  jsDesign.group(nodes, frame)
  renderPath.insertChild(renderPath.children.length - 1, frame)
  pathNode.visible = false

}

function renderNode(settingDatas) {
  const [datas, xDatas, yDatas, text, textColor, fontSize, width, height] = settingDatas

  const frame = jsDesign.createFrame()
  const nodes = []
  frame.name = '轨迹排版'
  frame.fills = [{
    type: "SOLID", opacity: 0, color: {
      b: 1,
      g: 1,
      r: 1,
    }
  }]
  frame.resize(renderPath.width, renderPath.height)
  xDatas.forEach((value, index) => {
    const rectNode =  jsDesign.createFrame()
    rectNode.x = pathNode.x + xDatas[index]
    rectNode.y = pathNode.y + yDatas[index]
    const newImg = jsDesign.createImage(jsDesign.base64Decode(datas))
		rectNode.fills = [Object.assign(newImg, { type: 'IMAGE', imageHash: newImg.hash, scaleMode: 'FILL' },)];
    rectNode.resize(width, height)
    nodes.push(rectNode)
  })
  jsDesign.group(nodes, frame)
  renderPath.insertChild(renderPath.children.length - 1, frame)
  pathNode.visible = false
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
      rect: [selection.width, selection.height]
    })
  }
})


function hexToRgba(hex) {
  return {
    r: parseInt("0x" + hex.slice(1, 3)) / 255,
    g: parseInt("0x" + hex.slice(3, 5)) / 255,
    b: parseInt("0x" + hex.slice(5, 7)) / 255,
  }
}

jsDesign.showUI(__html__, { width: 260, height: 200 });

function hex2rgb(hex) {
  return [Number('0x' + hex[1] + hex[2]) | 0, Number('0x' + hex[3] + hex[4]) | 0, Number('0x' + hex[5] + hex[6]) | 0];
}

const offset =  8

//监听从 插件ui 发过来的信息
jsDesign.ui.onmessage = msg => {
  if (msg.type === 'event:done') {
    const { rect, base64, mode } = msg
    const selection = jsDesign.currentPage.selection[0]
    const parentNode = selection.parent

    const frame = jsDesign.createFrame()
    frame.name = mode
    frame.fills = [{
      type: "SOLID", opacity: 0, color: {
        b: 1,
        g: 1,
        r: 1,
      }
    }]
    frame.x = selection.x
    frame.y = selection.y

    frame.resize(rect.width + offset, rect.height + offset)
    const rectNode =  jsDesign.createFrame()
    const newImg = jsDesign.createImage(jsDesign.base64Decode(base64))
		rectNode.fills = [Object.assign(newImg, { type: 'IMAGE', imageHash: newImg.hash, scaleMode: 'FILL' },)];
    rectNode.resize(rect.width, rect.height)

    selection.x = 0
    selection.y = 0
    selection.resize(rect.width, rect.height)
    frame.appendChild(selection)
    frame.appendChild(rectNode)
   

    parentNode.insertChild(parentNode.children.length - 1, frame)
    // selection.resizeWithoutConstraints(1370, 2732)
    //调用scrollAndZoomIntoView方法将创建的 节点 居中并以最佳缩放比展示
    jsDesign.viewport.scrollAndZoomIntoView(frame);
  }

};


jsDesign.on('selectionchange', async () => {
  if (jsDesign.currentPage.selection.length > 1) {
    jsDesign.notify("请选择一个设计稿！")
    return
  }
  const selection = jsDesign.currentPage.selection[0]
  jsDesign.ui.postMessage({
    type: 'select:done',
    name: selection.name,
    rect: { width: selection.width, height: selection.height} 
  })
})

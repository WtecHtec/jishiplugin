
jsDesign.showUI(__html__,{ width: 400, height: 300 });

jsDesign.ui.onmessage = async (msg) => {
	if (!msg) return;
	const { type,  datas,  } = msg 
  if (type === 'desc:action') {
    const { content, whigh, wsize} = datas
    //创建 画板
    const colorsFrame = jsDesign.createFrame();
    const textNode = jsDesign.createText()
    textNode.characters = content
    wsize > 0 && (textNode.fontSize = wsize)
    whigh > 0  && (textNode.lineHeight = whigh)
  }
}
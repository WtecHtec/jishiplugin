
jsDesign.showUI(__html__, { width: 400, height: 300 });

jsDesign.ui.onmessage = async (msg) => {
	if (!msg) return;
	const { type, datas, } = msg
	if (type === 'desc:action') {
		const { content, whigh, wsize } = datas
		//创建 画板
		// const colorsFrame = jsDesign.createFrame();
		const textNode = jsDesign.createText()
		textNode.characters = content
		wsize > 0 && (textNode.fontSize = wsize)
		whigh > 0 && (textNode.lineHeight = { unit: 'PIXELS', value: whigh })
		textNode.resize(375, 475)
		jsDesign.currentPage.appendChild(textNode);
	} else if (type === 'pic:action') {
		const { newBytes, width, height, } = datas
		console.log(datas)
		const newImg = jsDesign.createImage(newBytes)
		const rect = jsDesign.createRectangle();
		rect.fills = [Object.assign(newImg, { type: 'IMAGE', imageHash: newImg.hash, scaleMode: 'FILL' },)];
		rect.resize(Number(width), Number(height))
		jsDesign.currentPage.appendChild(rect);
	}
}

jsDesign.showUI(__html__, { width: 860, height: 760 });


function hex2rgb(hex) {
	return [Number('0x' + hex[1] + hex[2]) | 0, Number('0x' + hex[3] + hex[4]) | 0, Number('0x' + hex[5] + hex[6]) | 0];
}

let markId = null;
//监听从 插件ui 发过来的信息
jsDesign.ui.onmessage = msg => {
	if (!msg) return
	if (msg.type === 'createImage') {
		const { newBytes, width, height } = msg.datas
		// console.log(datas)
		const newImg = jsDesign.createImage(jsDesign.base64Decode(newBytes))
		const rect = jsDesign.createRectangle();
		rect.fills = [Object.assign(newImg, { type: 'IMAGE', imageHash: newImg.hash, scaleMode: 'FILL' },)];
		rect.resize(Number(width), Number(height))
		jsDesign.currentPage.appendChild(rect);
	}

};


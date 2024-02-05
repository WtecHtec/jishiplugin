
jsDesign.showUI(__html__, { width: 260, height: 200 });

function hex2rgb(hex) {
	return [Number('0x' + hex[1] + hex[2]) | 0, Number('0x' + hex[3] + hex[4]) | 0, Number('0x' + hex[5] + hex[6]) | 0];
}

const offset = 8

//监听从 插件ui 发过来的信息
jsDesign.ui.onmessage = msg => {
	if (msg.type === 'event:done') {
		const { rect, modeData, mode } = msg
		const {
			width: modew,
			height: modeh,
			base64,
			toffset,
			boffset,
			loffset,
			roffset,
			diffw,
			diffh,
			radius,
		} = modeData
		console.log(modeData, rect)
		const selection = jsDesign.currentPage.selection[0]
		const parentNode = selection.parent

		// const scale = 1
		const [, , scale, widthScale, heightScale] = scaleImage(modew, modeh, rect.width, rect.height)
		// console.log('scale----', scale, scaleImage(1116, 2370, rect.width, rect.height))
		console.log('widthScale, heightScale---', widthScale, heightScale)

		const width = rect.width
		const height = modeh * heightScale

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
		frame.resize(rect.width + loffset + roffset, rect.height)

		const rectNode = jsDesign.createFrame()
		// rectNode.x = -(loffset * scale)
		// rectNode.y = -(toffset * scale)
		const newImg = jsDesign.createImage(jsDesign.base64Decode(base64))
		rectNode.fills = [Object.assign(newImg, { type: 'IMAGE', imageHash: newImg.hash, scaleMode: 'CROP' },)];
		rectNode.resize(rect.width + loffset + roffset, rect.height)

		selection.x = 0
		selection.y = 0
		// selection.cornerRadius = radius * rect.height
		selection.resize(rect.width, rect.height)

		const renderFrame = jsDesign.createFrame()
		renderFrame.fills = [{
			type: "SOLID", opacity: 0, color: {
				b: 1,
				g: 1,
				r: 1,
			}
		}]
		renderFrame.resize(width, height)
		renderFrame.appendChild(selection)
		renderFrame.x = loffset
		renderFrame.y = toffset
		renderFrame.cornerRadius = radius

		frame.appendChild(renderFrame)
		frame.appendChild(rectNode)
		parentNode.insertChild(parentNode.children.length - 1, frame)
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
		rect: { width: selection.width, height: selection.height }
	})
})



function scaleImage(originalWidth, originalHeight, targetWidth, targetHeight) {
	if (originalWidth < targetWidth && originalHeight < targetHeight) {
		return [originalWidth, originalHeight, 1];
	}
	// 计算宽度和高度的缩放比例
	const widthScale = targetWidth / originalWidth;
	const heightScale = targetHeight / originalHeight;

	// 选择较小的缩放比例，以保持宽高比不变
	const scale = Math.min(widthScale, heightScale);

	// 计算新的宽度和高度
	const newWidth = originalWidth * scale;
	const newHeight = originalHeight * scale;

	return [newWidth, newHeight, scale, widthScale, heightScale];
}

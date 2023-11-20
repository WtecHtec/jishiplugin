
jsDesign.showUI(__html__, { width: 600, height: 500 });



let markId = null;
//监听从 插件ui 发过来的信息
jsDesign.ui.onmessage = msg => {
	const { pluginId } = msg
	if (pluginId !== 'GP7FyyyRrtLBFJiZiK_7C') return
	if (msg.type === 'createflow') {
		console.log(msg)
		const { bytes, width, height, grapdatas } = msg.datas
		const newImg = jsDesign.createImage(bytes)
		// console.log('newImg====', newImg, width, height)
		//创建 画板
		// const colorsFrame = jsDesign.createFrame();
		//设置画板宽高
		const rect = jsDesign.createRectangle();

		// 调用jsDesignConstraints设置画板的宽高，子图层不会被等比缩放，
		// colorsFrame.resizeWithoutConstraints(width, height);
		//创建 流程图
		rect.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }, Object.assign(newImg, { type: 'IMAGE', imageHash: newImg.hash, scaleMode: 'FIT' },)];
		// rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 } }];
		jsDesign.currentPage.appendChild(rect);
		rect.resizeWithoutConstraints(width, height);
		rect.setPluginData('grapdatas', grapdatas)
		// colorsFrame.appendChild(rect)
		//调用scrollAndZoomIntoView方法将创建的 节点 居中并以最佳缩放比展示
		jsDesign.viewport.scrollAndZoomIntoView([rect]);
	}

};

jsDesign.on('selectionchange', async () => {
	const selection = jsDesign.currentPage.selection
	if (selection && selection.length === 1) {
		const grapdatas = selection[0].getPluginData('grapdatas')
		if (grapdatas) {
			jsDesign.ui.postMessage({
				type: 'grapdatas',
				datas: grapdatas,
			})
		}
	}
})


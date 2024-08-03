
jsDesign.showUI(__html__, { width: 800, height: 680 });



let nodeDatas = []
//监听从 插件ui 发过来的信息
jsDesign.ui.onmessage = async (msg) => {
	if (!msg) return;
	const { type, pluginId, } = msg
	// if (pluginId !== "1_ZQp2EwQPLwdJ2ifcvUZ") return
	switch (type) {
		case 'addppt:action':
			const selection = jsDesign.currentPage.selection
			console.log('selection---', selection)
			if (selection && selection.length === 1 && selection[0] && selection[0].visible) {
				// console.log('selection---', selection[0])
				const { name, width, height } = selection[0]
				selection[0].exportAsync().then(res => {
					nodeDatas.push(selection[0])
					console.log('------------ ui - html')
					jsDesign.ui.postMessage({
						type: 'addppt:commit',
						datas: { name, imgbytes: res, rect: { width, height } },
					})
				})
			}
			// 批量
			if (selection && selection.length > 1) {
				console.log('批量 selection---', selection)
				const array = [...selection].reverse()
				for (let i = 0; i < array.length; i++) {
					const item = array[i]
					if (item.visible) {
						await sendAddPPTArray(item)
					}
				}
			}
			break
		case 'createppt:init':
			// 解析数据
			// 1. 查找 文字，
			const datas = await tranformData()
			jsDesign.ui.postMessage({
				type: 'createppt:commit',
				datas,
			})
			break
	}
};


function sendAddPPTArray(selection) {
	return  new Promise((resolve, reject) => {
			const { name, width, height } = selection
			selection.exportAsync().then(res => {
				nodeDatas.push(selection)
				jsDesign.ui.postMessage({
					type: 'addppt:commit',
					datas: { name, imgbytes: res, rect: { width, height } },
				})
				resolve(1)
			})
	})
}



async function tranformData() {
	const cache = {}
	const result = []
	async function dg(item, step) {
		const { name, visible, width, height, id, x, y, type, fontSize, characters, fills, absoluteBoundingBox } = item
		if (!visible) return null
		if (cache[id]) return cache[id]
		let result = { name, visible, width, height, id, x, y, type, fontSize, characters, fills, absoluteBoundingBox }
		if (item.findAll && typeof item.findAll === 'function') {
			const textNodes = item.findAll(item => {
				return item.type === "TEXT" && item.visible
			})
			if (textNodes.length === 0) {
				const imgbytes = await item.exportAsync()
				result = Object.assign(result, { name, width, height, id, x, y, imgbytes, type: 'image', absoluteBoundingBox })
				cache[id] = result;
				return result;
			}
		}
		if (fills && fills.length) {
			for (let i = 0; i < fills.length; i++) {
				const { type: ftype, color: fcolor, gradientStops } = fills[i]
				let bgcolor = ''
				try {
					bgcolor = rgbaToHex(fcolo.r * 255, fcolor.g * 255, fcolor.b * 255)
				} catch (error) {
					bgcolor = ''
				}
				if (ftype === 'SOLID' && bgcolor) {
					result = Object.assign(result, { color: bgcolor, type: 'paint', })
					break
				}
				else if (ftype === 'IMAGE') {
					const imgbytes = await item.exportAsync()
					result = Object.assign(result, { imgbytes, type: 'image', })
					break
				}
				else if (['GRADIENT_LINEAR', 'GRADIENT_RADIAL', 'GRADIENT_ANGULAR'].includes(ftype) && gradientStops && gradientStops.length) {
					const { color: gcolor } = gradientStops[gradientStops.length - 1]
					try {
						bgcolor = rgbaToHex(gcolor.r * 255, gcolor.g * 255, gcolor.b * 255)
					} catch (error) {
						bgcolor = ''
					}
					bgcolor && (result = Object.assign(result, { color: bgcolor, type: 'paint', }))
					break
				}
			}
		}
		// 子节点
		if (item.children && item.children.length) {
			result.children = []
			for (let i = 0; i < item.children.length; i++) {
				const res = await dg(item.children[i])
				result.children.push(res)
			}
			// item.children.forEach(async (el) => {
			// 	const res = await dg(el)
			// 	result.children.push(res)
			// })
			cache[id] = result;
			return result
		} else {
			if (type !== 'TEXT') {
				const imgbytes = await item.exportAsync()
				result = Object.assign(result, { name, width, height, id, x, y, imgbytes, type: 'image', absoluteBoundingBox })
			} else {
				let color = ''
				if (fills && fills.length) {
					const fItem = fills.find((element) => element.type === 'SOLID');
					if (fItem) {
						const { color: { r, g, b } } = fItem;
						try {
							color = rgbaToHex(r * 255, g * 255, b * 255)
						} catch (error) {
						}
					}
				}
				result = Object.assign(result, { name, width, height, id, x, y, fontSize, characters, color, type: 'text', absoluteBoundingBox })
			}
			cache[id] = result;
			return result
		}
	}

	for (let i = 0; i < nodeDatas.length; i++) {
		const res = await dg(nodeDatas[i])
		result.push(res)
	}
	console.log('result----', nodeDatas, result)
	// nodeDatas.forEach(async (item) => {
	// 	const res = await dg(item)
	// 	result.push(res)
	// 	console.log('result----', nodeDatas, result)
	// })
	return result
}

function rgbaToHex(r, g, b) {
	const red = r.toString(16).padStart(2, '0');
	const green = g.toString(16).padStart(2, '0');
	const blue = b.toString(16).padStart(2, '0');
	return `${red}${green}${blue}`;
}


jsDesign.on('run', () => {
  console.log('插件开始运行')
  console.log(jsDesign.currentUser)
  if (!jsDesign.currentUser) return
  jsDesign.ui.postMessage({
    type: 'info:done',
    datas: jsDesign.currentUser,
  })
})
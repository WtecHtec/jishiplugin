
jsDesign.showUI(__html__, { width: 1080, height: 600 });

let exportDatas = []
//监听从 插件ui 发过来的信息
jsDesign.ui.onmessage = async (msg) => {
	if (!msg) return;
	const { type, pluginId, datas, exportstatus, exporttarget } = msg
	// console.log('msg --- HTML - UI', msg)
	if (pluginId !== "a4fIbuyegeVH2F2k0TKRA") return
	if (type === 'create:frame') {
		const selection = jsDesign.currentPage.selection
		console.log('selection---', selection)
		if (Array.isArray(selection) && selection.length === 1) {
			const { name, id, width, height, x, y, rotation, opacity, cornerRadius } = selection[0]
			// console.log(' jsDesign.ui.postMessage---',  jsDesign.ui.postMessage)
			jsDesign.ui.postMessage({
				type: 'create:frame:done',
				datas: { name, id, properties: { width, height, x, y, rotation, opacity, cornerRadius } },
			})
		}
	} else if (type === 'export:target') {
		const selection = jsDesign.currentPage.selection
		console.log('selection---', selection)
		if (Array.isArray(selection) && selection.length === 1) {
			const { name, id } = selection[0]
			// console.log(' jsDesign.ui.postMessage---', jsDesign.ui.postMessage)
			jsDesign.ui.postMessage({
				type: 'export:target:done',
				datas: { name, id },
			})
		}
	}
	else if (type === 'animation:frame') {
		// console.log('html->ui', datas)
		if (!datas) return
		for (let key in datas) {
			if (key === 'time') continue
			const keySps = key.split('#_#')
			const id = keySps[keySps.length - 1]
			const node = jsDesign.getNodeById(id)
			// console.log('html----ui', node)
			const props = datas[key]
			for (let pkey in props) {
				const prop = props[pkey]
				if (Object.keys(prop).length && 'properties' in prop && prop['properties'] && prop['properties'].value !== undefined) {
					// console.log('prop------', prop, pkey)
					const newValue = prop['properties'].value
					pkey === 'x' && (node.x = newValue)
					pkey === 'y' && (node.y = newValue)
					pkey === 'width' && (node.resize(newValue, node.height))
					pkey === 'height' && (node.resize(node.width, newValue))
					pkey === 'rotation' && (node.rotation = newValue)
					pkey === 'rescale' && (node.rescale = newValue)
					pkey === 'opacity' && (node.opacity = newValue)
					pkey === 'cornerRadius' && (node.cornerRadius = newValue)
					// node[pkey] = prop['properties'].value
				}
			}
		}

		if (exportstatus) {
			const node = jsDesign.getNodeById(exporttarget.id)
			// console.log('node---', node)

			const imgbytes = await node.exportAsync()
			exportDatas.push(imgbytes)
		} else {
			exportDatas = []
		}
	} else if (type === 'export:frame') {
		jsDesign.ui.postMessage({
			type: 'export:frame:done',
			datas: { exportDatas },
		})
	}
};



jsDesign.showUI(__html__, { width: 400, height: 700 });


let color = '#E8178A'
let strokeWeight = 5
const vectcachekey = 'vectcache' // 当前页面 from映射
const childfromcachekey = 'childfrom' // 有多少起始子节点
const tocachekey = 'ownto' // 我连接谁
const formcachekey = 'ownfrom' // 谁连接我
const pathtokey = 'pathto'
const idfix = 'flowver'
//监听从 插件ui 发过来的信息
jsDesign.ui.onmessage = async (msg) => {
	console.log(msg)
	// jsDesign.showUI(__html__, { width: 760, height: 123 });
	if (msg.type === 'select:form') {
		const selection = jsDesign.currentPage.selection
		try {
			console.log('selection--', selection, selection[0].strokeCap.valueOf(), selection[0].strokeCap.toString())
		} catch (error) {

		}

		if (selection.length === 1) {
			jsDesign.ui.postMessage({
				type: 'select:form:done',
				datas: {
					id: selection[0].id,
					name: selection[0].name
				},
			})
		}
	} else if (msg.type === 'select:to') {
		const selection = jsDesign.currentPage.selection
		if (selection.length === 1) {
			jsDesign.ui.postMessage({
				type: 'select:to:done',
				datas: {
					id: selection[0].id,
					name: selection[0].name
				},
			})
		}
	} else if (msg.type === 'contect:done') {
    const { datas } = msg
		const { formNode, toNode, pathData } = datas;
    const fromEl = jsDesign.getNodeById(formNode.id)
    const toEl = jsDesign.getNodeById(toNode.id)
    const vectNode = createContect(fromEl, toEl, pathData)
		setTimeout(() => {
			console.log(vectNode, vectNode.id)
			setCacheData(fromEl, toEl, vectNode.id)
		}, 500)
  } 
  else if (msg.type === 'contect') {
		const { datas } = msg
		const { formNode, toNode } = datas;
		color = msg.color || color
		if (formNode.id === toNode.id) {
			jsDesign.notify('嘿，麻烦选择两个节点。')
			return
		}
		const fromEl = jsDesign.getNodeById(formNode.id)

		if (!fromEl) {
			jsDesign.notify('嘿，FROM节点不知道跑哪里了。')
			return
		}

		if (checkContect(formNode.id)) {
			jsDesign.notify('嘿，一个节点只能作为一个FROM节点。')
			return
		}
		console.log('checkContect(fromEl.id)---', jsDesign.currentPage,  checkContect(formNode.id))
		const toEl = jsDesign.getNodeById(toNode.id)
		if (!toEl) {
			jsDesign.notify('嘿，TO节点不知道跑哪里了。')
			return
		}
    
    const childrens = jsDesign.currentPage.children.map(item => ({ 
        id: item.id, 
        width: item.width, 
        height: item.height, 
        x: item.x, 
        y: item.y,
        nodeType: item.type,
      }))

      const [fromX, fromY] = getGlobalXY(fromEl)
      const fromItem = {
        id: fromEl.id, 
        width: fromEl.width, 
        height: fromEl.height, 
        x: fromX, 
        y: fromY,
        type: 'from',
        direc: formNode.direc,
        nodeType: fromEl.type,
      }
      childrens.push(fromItem)

      const [toX, toY] = getGlobalXY(toEl)
      const toItem = {
        id: toEl.id, 
        width: toEl.width, 
        height: toEl.height, 
        x:  toX, 
        y: toY,
        type: 'to',
        direc: toNode.direc,
        nodeType: toEl.type,
      }
      childrens.push(toItem)

    jsDesign.ui.postMessage({
      type: 'contect:done',
      datas: {
        childrens,
        links: [fromItem, toItem]
      },
    })
		// const vectNode = createContect(fromEl, toEl, formNode.direc, toNode.direc)
		// setTimeout(() => {
		// 	console.log(vectNode, vectNode.id)
		// 	setCacheData(fromEl, toEl, vectNode.id)
		// }, 500)

	} else if (msg.type === 'select:entry') {
		const selection = jsDesign.currentPage.selection
		if (selection.length === 1 && selection[0].parent.type === 'PAGE') {
			jsDesign.ui.postMessage({
				type: 'select:entry:done',
				datas: {
					id: selection[0].id,
					name: selection[0].name
				},
			})
		} else {
			jsDesign.notify('嘿，选择入口节点错误。')
		}
	} else if (msg.type === 'perview') {
		const { datas } = msg
		const { entry, width, height } = datas
		const entryNode = jsDesign.getNodeById(entry)
		if (!entryNode) {
			jsDesign.notify('嘿，节点失踪了。')
			return
		}
		const base64 = jsDesign.base64Encode(await entryNode.exportAsync());
		width && height && jsDesign.ui.resize(Number(width), Number(height))
		jsDesign.ui.postMessage({
			type: 'perview:done',
			datas: {
				id: entry,
				perivewdata: base64,
				events: getFromDatas(entryNode),
				rect: { width: entryNode.width, height: entryNode.height }
			},
		})
	} else if (msg.type === 'reset') {
		jsDesign.ui.resize(400, 700)
	} else if (msg.type === 'perview:mini') {
		const { datas } = msg
		const { entry, } = datas
		await handlePerviewMini(entry)
	}

};

async function handlePerviewMini(id) {
	let files = [];
	let datas = [];
	let cache = {}
	await fromPerviewDatas(id, files, datas, cache)
	console.log('perview:mini1---')
	jsDesign.ui.postMessage({
		type: 'perview:mini:done',
		datas: {
			files: files,
			configDatas: datas,
			userId: jsDesign.currentUser.id,
		},
	})
}

async function fromPerviewDatas(id, files, datas, cache) {
	const entryNode = jsDesign.getNodeById(id)
	if (!entryNode || cache[id]) return
	cache[id] = true
	const uint8Array = await entryNode.exportAsync()
	// const blob = new Blob([uint8Array], { type: 'image/png' });
	// const blobToFile = new File([blob], this.currentImage.fileName, {

	// 	type: 'image/*'

	// })
	const item = {
		id: id,
		events: getFromDatas(entryNode),
		rect: { width: entryNode.width, height: entryNode.height }
	}
	files.push(uint8Array)
	datas.push(item)
	if (Array.isArray(item.events) && item.events.length) {
		for (let i = 0; i < item.events.length; i++) {
			const { toId } = item.events[i];
			await fromPerviewDatas(toId, files, datas, cache)
		}
	}
}


function getGlobalXY(el) {
	let x = 0
	let y = 0
	const parent = getParent(el)
	if (el.id === parent.id) {
		x = parent.absoluteBoundingBox.x
		y = parent.absoluteBoundingBox.y
	} else {
		x = parent.absoluteBoundingBox.x + el.x
		y = parent.absoluteBoundingBox.y + el.y
	}
	return [x, y]
}

// 第一个点
function getElDirecPoint(el) {
	const [x, y] = getGlobalXY(el)
	console.log(x, y)
	const { width, height } = el
	const top = {
		x: x + (width / 2),
		y,
	}
	const bottom = {
		x: x + (width / 2),
		y: y + height
	}

	const left = {
		x: x,
		y: y + (height / 2)
	}
	const right = {
		x: x + width,
		y: y + (height / 2)
	}
	return {
		top, bottom, left, right
	}
}

// 第二个点
function getOffsetPoint(point, direc) {
	point = JSON.parse(JSON.stringify(point))
	const space = 30
	switch (direc) {
		case 'top':
			point.y = point.y - space
			break
		case 'bottom':
			point.y = point.y + space
			break
		case 'left':
			point.x = point.x - space
			break
		case 'right':
			point.x = point.x + space
			break
	}
	return point
}

// 第三个点
function getTurnPoints(from, to, el, direc) {
	let space = 20
	let point = JSON.parse(JSON.stringify(from))
	const { width, height } = el
	let pdirec = 'right'
	if (direc === 'top' || direc === 'bottom') {
		if (from.x > to.x) {
			// 在右边
			point.x = point.x - width / 2 - space
			pdirec = 'right'
		} else {
			// 左边
			point.x = point.x + width / 2 + space
			pdirec = 'left'
		}
	} else {
		if (from.y > to.y) {
			// 在下边
			point.y = point.y - height / 2 - space
			pdirec = 'bottom'
		} else {
			// 上边
			point.y = point.y + height / 2 + space
			pdirec = 'top'
		}
	}
	return [point, pdirec]
}

// 第四个点
function getContectPoints(from, to,) {
	const x = Math.abs(Math.abs(from.x) - Math.abs(to.x))
	const point0 = {
		x: from.x + (from.x > to.x ? - x / 2 : x / 2),
		y: from.y,
	}
	const y = Math.abs(Math.abs(from.y) - Math.abs(to.y))
	const point1 = {
		x: point0.x,
		y: point0.y + (from.y > to.y ? - y : y),
	}
	return [point0, point1]
}

function createContect(fromEl, toEl, pathData) {
	const vectorNode = jsDesign.createVector()

	// if (!formDirec) {
	// 	formDirec = 'top'
	// }

	// if (!toDirec) {
	// 	toDirec = 'top'
	// }

	// const point0 = getElDirecPoint(fromEl)[formDirec]
	// const point1 = getOffsetPoint(point0, formDirec)

	// const pointTo0 = getElDirecPoint(toEl)[toDirec]
	// const pointTo1 = getOffsetPoint(pointTo0, toDirec)

	// let [point2, point2Direc] = getTurnPoints(point1, pointTo1, fromEl, formDirec)

	// let [pointTo2, pointTo2Direc] = getTurnPoints(pointTo1, point1, toEl, toDirec)

	// const [point3, point4] = getContectPoints(point2, pointTo2)

	// const point4 = getContectPoints(point1, pointTo1)

	// const pathData = `
  //   M ${point0.x} ${point0.y} 
  //   L ${point1.x} ${point1.y}
  //   L ${point2.x} ${point3.y}
  //   L ${point3.x} ${point3.y}
  //   L ${point4.x} ${point4.y}
  //   L ${pointTo2.x} ${pointTo2.y}
  //   L ${pointTo1.x} ${pointTo1.y}
  //   L ${pointTo0.x} ${pointTo0.y}
  // `

	//   const pathData = `
	//   M ${point0.x} ${point0.y} 
	//   L ${pointTo0.x} ${pointTo0.y}
	// `

	// const pathData = `
	// M ${point0.x} ${point0.y} 
	// L ${point1.x} ${point1.y}
	// L ${point4.x} ${point4.y}
	// L ${pointTo1.x} ${pointTo1.y}
	// L ${pointTo0.x} ${pointTo0.y}
	// `

	// const pathData = `
	//   M ${point0.x} ${point0.y} 
	//   L ${point1.x} ${point1.y}
	//   L ${point2.x} ${point2.y}
	//   L ${point3.x} ${point3.y}
	//   L ${pointTo2.x} ${pointTo2.y}
	//   L ${pointTo1.x} ${pointTo1.y}
	//   L ${pointTo0.x} ${pointTo0.y}
	// `
	vectorNode.name = `${fromEl.name}->${toEl.name}`
	vectorNode.strokeCap = 'ARROW_EQUILATERAL'
	vectorNode.vectorPaths = [{
		windingRule: "NONE",
		data: pathData
	}]
	vectorNode.strokes = [{
		type: "SOLID", opacity: 1, color: hexToRgba(color)
	}]
	vectorNode.strokeWeight = strokeWeight
	try {
		let vectorNetwork = JSON.parse(JSON.stringify(vectorNode.vectorNetwork))
		// vectorNode.vectorNetwork.vertices.splice(0, 1)

		vectorNetwork.vertices[0].strokeCap = 'SQUARE'
		vectorNetwork.vertices[vectorNetwork.vertices.length - 1].strokeCap = 'ARROW_LINES'
		vectorNode.vectorNetwork = vectorNetwork
	} catch (error) {
		console.log('vectorNetwork:', error)
	}
	vectorNode.setPluginData(pathtokey, toEl.id)
	// vectorNode.strokeJoin = 'ROUND'
	// console.log('pathData----', pathData)
	jsDesign.currentPage.appendChild(vectorNode)
	return vectorNode
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


function hexToRgba(hex) {
	return {
		r: parseInt("0x" + hex.slice(1, 3)) / 255,
		g: parseInt("0x" + hex.slice(3, 5)) / 255,
		b: parseInt("0x" + hex.slice(5, 7)) / 255,
	}
}


function setCacheData(fromEl, toEl, vectId) {

	// const cacheData = {
	//   ownto: '', // 自身前往的元素
	//   ownfrom: [], // 谁跳转到自身
	//   childto: [], // 
	//   childfrom: [] // 子节点有多少需要跳转的节点
	// }


	let vectCache = jsDesign.currentPage.getPluginData(vectcachekey)
	// console.log('fromCache---', fromParent, fromCache)
	if (vectCache) {
		vectCache = JSON.parse(vectCache)
		vectCache = refreshChildFrom(vectCache)
		vectCache.push({
			from: fromEl.id,
			vectId: vectId,
		})
		jsDesign.currentPage.setPluginData(vectcachekey, JSON.stringify(vectCache))
	} else {
		jsDesign.currentPage.setPluginData(vectcachekey, JSON.stringify(
			[{
				from: fromEl.id,
				vectId: vectId,
			}]
		))
	}


	// FROM 父级页面（每层）
	const fromParent = getParent(fromEl)
	let fromCache = fromParent.getPluginData(childfromcachekey)
	// console.log('fromCache---', fromParent, fromCache)
	if (fromCache) {
		fromCache = JSON.parse(fromCache)
		fromCache = refreshChildFrom(fromCache)
		fromCache.push({
			from: fromEl.id,
			vectId: vectId,
		})
		fromParent.setPluginData(childfromcachekey, JSON.stringify(fromCache))
	} else {
		fromParent.setPluginData(childfromcachekey, JSON.stringify(
			[{
				from: fromEl.id,
				vectId: vectId,
			}]
		))
	}


	// FROM 自身元素
	// let fromElCache = fromEl.getPluginData(tocachekey)
	fromEl.setPluginData(tocachekey, toEl.id)

	// To 根页面
	// let toElCache = toEl.getPluginData(formcachekey)
	// if (toElCache) {
	// 	toElCache = JSON.parse(toElCache)
	// 	toElCache.push(fromEl.id)
	// 	toEl.setPluginData(formcachekey, JSON.stringify(toElCache))
	// } else {
	// 	toEl.setPluginData(formcachekey, JSON.stringify([fromEl.id]))
	// }

}

// 入口
function getFromDatas(el) {
	let parentCache = el.getPluginData(childfromcachekey)
	const reslut = []

	if (parentCache) {
		parentCache = JSON.parse(parentCache)
		console.log('elCache---', parentCache)
		// 刷新链接数据
		parentCache = refreshChildFrom(parentCache)
		el.setPluginData(childfromcachekey, JSON.stringify(parentCache))
		if (Array.isArray(parentCache)) {
			parentCache.forEach(({ from }) => {
				console.log('reslut---', reslut, from)
				const node = jsDesign.getNodeById(from)
				let ownto = node.getPluginData(tocachekey)
				console.log('ownto---', ownto)
				if (node && ownto) {
					reslut.push({
						id: from,
						toId: ownto,
						x: node.x,
						y: node.y,
						w: node.width,
						h: node.height
					})
				}
			})
		}
	}
	console.log('reslut---', reslut)
	return reslut
}

// 判断是否已经连接
function checkContect(fromid) {
	let vectcache = jsDesign.currentPage.getPluginData(vectcachekey)
	if (!vectcache) return false
	vectcache = JSON.parse(vectcache)
	console.log(vectcache, fromid)
	const findNode = vectcache.find(({ from }) => from === fromid)
	console.log('findNode---', findNode)
	if (!findNode) return false
	const { vectId } = findNode
	const vectNode = jsDesign.getNodeById(vectId)
	console.log(vectNode)
	return vectNode
}

// 刷新连接节点数组
function refreshChildFrom(fromCache) {
	const result = []
	fromCache.forEach(({ from, vectId }) => {
		const fromNode = jsDesign.getNodeById(from)
		const vectNode = jsDesign.getNodeById(vectId)
		if (fromNode && vectNode) {
			result.push({
				from,
				vectId,
			})
		}
	})
	return result;
}

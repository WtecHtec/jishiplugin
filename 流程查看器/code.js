
jsDesign.showUI(__html__, { width: 400, height: 700 });


let color = '#E8178A'
let strokeWeight = 5
const cachekey = 'flowperview'
//监听从 插件ui 发过来的信息
jsDesign.ui.onmessage = msg => {
  // jsDesign.showUI(__html__, { width: 760, height: 123 });
	if (msg.type === 'select:form') {
    const selection = jsDesign.currentPage.selection
    // try {
    //   console.log('selection--', selection, selection[0].strokeCap.valueOf(), selection[0].strokeCap.toString())
    // } catch (error) {
      
    // }
    
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
	} else if (msg.type === 'contect') {
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

    const toEl = jsDesign.getNodeById(toNode.id)
    if (!toEl) {
      jsDesign.notify('嘿，TO节点不知道跑哪里了。')
      return
    }
    createContect(fromEl, toEl, formNode.direc, toNode.direc)
    setCacheData(fromEl, toEl)
  } else if (msg.type === 'select:entry') {
    const selection = jsDesign.currentPage.selection
    if (selection.length === 1) {
      jsDesign.ui.postMessage({
        type: 'select:entry:done',
        datas: { 
          id: selection[0].id,
          name: selection[0].name
        },
      })
    }
  } else if (msg.type === 'perview') {
    const {  datas } = msg
    const { entry, width,  height,} = datas
    const entryNode = jsDesign.getNodeById(entry)
    if (!entryNode) {
      jsDesign.notify('入口节点失踪了。')
      return
    }
    jsDesign.ui.resize(Number(width) , Number(height) )
    jsDesign.ui.postMessage({
      type: 'perview:done',
      datas: { 
      },
    })
  } else if (msg.type === 'reset') {
    jsDesign.ui.resize(400 , 700 )
  }

};

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
  const [x, y]  = getGlobalXY(el)
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
    y: y +  (height / 2 )
  }
  const right =  {
    x: x + width,
    y: y +  (height / 2 )
  }
  return {
    top, bottom, left, right
  }
}

// 第二个点
function getOffsetPoint(point, direc) {
  point = JSON.parse(JSON.stringify(point))
  const space = 30
  switch(direc) {
    case 'top': 
      point.y =  point.y - space
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
  if (direc === 'top' || direc === 'bottom') {
    if (from.x > to.x) {
      // 在右边
      point.x = point.x - width / 2 - space
    } else {
      // 左边
      point.x = point.x + width / 2  + space
    }
  } else {
    if (from.y > to.y) {
      // 在下边
      point.y = point.y - height / 2 - space
    } else {
      // 上边
      point.y = point.y + height / 2  + space
    }
  }
  return point
}

// 第四个点
function getContectPoints(from, to,) {
  const x = Math.abs(Math.abs(from.x) - Math.abs(to.x))
  const point0 = {
    x: from.x + (from.x > to.x ? - x / 2 : x / 2) ,
    y: from.y,
  }
  const y = Math.abs( Math.abs(from.y) - Math.abs(to.y))
  const point1 = {
    x: point0.x,
    y: point0.y + (from.y > to.y ?  - y :  y) ,
  }
  return [point0, point1]
}

function createContect(fromEl, toEl, formDirec, toDirec) {
  const vectorNode = jsDesign.createVector()
  if (!formDirec) {
    formDirec = 'top'
  }

  if (!toDirec) {
    toDirec = 'top'
  }

  const point0 = getElDirecPoint(fromEl)[formDirec]
  const point1 = getOffsetPoint(point0, formDirec)

  const pointTo0 = getElDirecPoint(toEl)[toDirec]
  const pointTo1 = getOffsetPoint(pointTo0, toDirec)

  const point2 = getTurnPoints(point1, pointTo1, fromEl, formDirec )

  const pointTo2 = getTurnPoints(pointTo1, point1, toEl, toDirec )

  const [point3, point4 ] = getContectPoints(point2, pointTo2)
  
  // const point4 = getContectPoints(point1, pointTo1)

  const pathData = `
    M ${point0.x} ${point0.y} 
    L ${point1.x} ${point1.y}
    L ${point2.x} ${point3.y}
    L ${point3.x} ${point3.y}
    L ${point4.x} ${point4.y}
    L ${pointTo2.x} ${pointTo2.y}
    L ${pointTo1.x} ${pointTo1.y}
    L ${pointTo0.x} ${pointTo0.y}
  `

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
  //   L ${point2.x} ${pointTo2.y}
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
    vectorNetwork.vertices[vectorNetwork.vertices.length - 1].strokeCap = 'ARROW_LINES'
    vectorNode.vectorNetwork = vectorNetwork
  } catch (error) {
      console.log('vectorNetwork:', error)
  }
  

  // vectorNode.strokeJoin = 'ROUND'
  // console.log('pathData----', pathData)
  jsDesign.currentPage.appendChild(vectorNode)

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


function setCacheData(fromEl, toEl) {
  
  // const cacheData = {
  //   ownto: '', // 自身前往的元素
  //   ownfrom: [], // 谁跳转到自身
  //   childto: [], // 
  //   childfrom: [] // 子节点有多少需要跳转的节点
  // }

  // FROM 根页面
  const fromParent = getParent(fromEl)
  let fromCache = fromParent.getPluginData(cachekey)
  if (fromCache) {
    fromCache = JSON.parse(fromCache)
    fromCache.childfrom.push(fromEl.id)
    fromParent.setPluginData(cachekey, JSON.stringify(fromCache))
  } else {
    fromParent.setPluginData(cachekey, JSON.stringify({
      childfrom: [fromEl.id]
    }))
  }

  // FROM 自身元素
  let fromElCache = fromEl.getPluginData(cachekey)
  if (fromElCache) {
    fromElCache = JSON.parse(fromElCache)
    fromElCache.ownto = toEl.id
    fromEl.setPluginData(cachekey, JSON.stringify(fromCache))
  } else {
    fromEl.setPluginData(cachekey, JSON.stringify({
      ownto: toEl.id
    }))
  }


    // To 根页面
    // const toElParent = getParent(toEl)
    // let toCache = toElParent.getPluginData(cachekey)
    // if (toCache) {
    //   toCache = JSON.parse(toCache)
    //   toCache.childto.push(fromEl.id)
    //   toElParent.setPluginData(cachekey, JSON.stringify(toCache))
    // } else {
    //   toElParent.setPluginData(cachekey, JSON.stringify({
    //     childto: [fromEl.id]
    //   }))
    // }

    // To 根页面
    let toElCache = toEl.getPluginData(cachekey)
    if (toElCache) {
      toElCache = JSON.parse(toElCache)
      toElCache.ownfrom.push(fromEl.id)
      toEl.setPluginData(cachekey, JSON.stringify(toElCache))
    } else {
      toEl.setPluginData(cachekey, JSON.stringify({
        ownfrom: [fromEl.id]
      }))
    }


}
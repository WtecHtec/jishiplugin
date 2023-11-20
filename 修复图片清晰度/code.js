
jsDesign.showUI(__html__,{ width: 200, height: 80 });

let currentSel = null

// 监听从 插件ui 发过来的信息
jsDesign.ui.onmessage = msg => {
  console.log('html -> ui', msg)
  const { pluginId, type, datas} = msg
  if (pluginId !== 'o9g2F02HEiP86uynkYIvq' || !currentSel) return
  const newImg = jsDesign.createImage(datas)
  console.log('newImg====', newImg)
  const newPaint = JSON.parse(JSON.stringify(currentSel.fills[0]))
  newPaint.imageHash = newImg.hash
  currentSel.fills = [newPaint]
  console.log('currentSel===', currentSel)
};


jsDesign.on('selectionchange', async () => {
  const selection = jsDesign.currentPage.selection
  currentSel = null;
  if (selection && selection.length === 1) {
    const { width, height, type, name, fills } =  selection[0]
    if (fills && fills.length === 1  && fills[0] && fills[0].type === 'IMAGE') {
      currentSel =  selection[0]
      const image = jsDesign.getImageByHash(fills[0].imageHash)
      const bytes = await image.getBytesAsync()
      jsDesign.ui.postMessage( {
        type: 'export',
        datas: bytes,
        rect: {
         width,
         height,
        },
       })
      // selection[0].exportAsync().then(res => {
      //   console.log('fff', selection[0])
      //   jsDesign.ui.postMessage( {
      //    type: 'export',
      //    datas: bytes,
      //    rect: {
      //     width,
      //     height,
      //    },
      //   })
      // })
    } else {
      jsDesign.ui.postMessage( {
        type: 'notype',
        datas: [],
        rect: {},
       })
    }

  }
})


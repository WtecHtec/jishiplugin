
jsDesign.showUI(__html__,{ width: 800, height: 800 });

let markId = null;
// 监听从 插件ui 发过来的信息
jsDesign.ui.onmessage = msg => {

};

jsDesign.on('selectionchange', () => {
  const selection = jsDesign.currentPage.selection
  if (selection && selection.length === 1) {
    const { width, height } =  selection[0]
    selection[0].exportAsync().then(res => {
      jsDesign.ui.postMessage( {
       type: 'export',
       datas: res,
       rect: {
        width,
        height
       }
      })
    })
  }
})


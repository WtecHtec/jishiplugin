
jsDesign.showUI(__html__,{ width: 500, height: 800 });


let markId = null;
//监听从 插件ui 发过来的信息
jsDesign.ui.onmessage = msg => {
  if (msg.type === 'createLayer') {
  
  }

};


jsDesign.on('selectionchange', async () => {

  const selection = jsDesign.currentPage.selection[0] 
  const base64 = jsDesign.base64Encode(await selection.exportAsync());
  jsDesign.ui.postMessage({
    type: 'select:done',
    datas: base64,
    id: selection.id,
    rect: [selection.width, selection.height]
  })

})
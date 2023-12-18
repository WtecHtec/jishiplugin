
jsDesign.showUI(__html__,{ width: 800, height: 600 });


function hex2rgb(hex) {
  return [Number('0x' + hex[1] + hex[2]) | 0, Number('0x' + hex[3] + hex[4]) | 0, Number('0x' + hex[5] + hex[6])| 0];
}

let markId = null;
//监听从 插件ui 发过来的信息
jsDesign.ui.onmessage = msg => {
  if (!msg) return
  if (msg.type === 'desgin:action') {
    const selection = jsDesign.currentPage.selection
    if (selection && selection.length === 1) {
      const { width, height } =  selection[0]
      selection[0].exportAsync().then(res => {
        jsDesign.ui.postMessage( {
         type: 'desgin:export',
         datas: res,
         rect: { width, height}
        })
      })
    } else {
      jsDesign.notify("请选择一张设计稿！")
    }
  }

};


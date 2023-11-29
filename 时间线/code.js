
jsDesign.showUI(__html__,{ width: 260, height: 120 });
const CACHE_KEY = 'history'
//监听从 插件ui 发过来的信息
jsDesign.ui.onmessage = msg => {
  if (!msg) return
  console.log('htm -> ui', msg)
  if (msg.type === 'addTag:action') {
      const { datas: { id } } = msg;
      if (!id) {
        jsDesign.notify("嘿，选个节点来玩玩吧！")
        return
      }
      const node = jsDesign.getNodeById(id)
      console.log('currentPage---', node, jsDesign.currentPage)
      if (!node) {
        jsDesign.notify("节点丢失在时空中，再次尝试寻找！")
        return
      } 
      const { selection } = jsDesign.currentPage
      if (selection.length === 1) {
        const pluginDatas =  node.getPluginData(CACHE_KEY)
        const cloneNode = node.clone()
        cloneNode.getPluginData(CACHE_KEY, '')
        if (!pluginDatas) {
          const pageNode = jsDesign.createFrame()
          pageNode.name = `时间线: ${node.name}`
          pageNode.visible = false
          pageNode.appendChild(cloneNode)
          jsDesign.currentPage.appendChild(pageNode)
        }
      } else {
        jsDesign.notify("嘿，选个节点来玩玩吧！")
      } 
  }
};


jsDesign.on('selectionchange', () => {
  sendSelectNode()
})


jsDesign.on('run', () => {
  sendSelectNode()
})



function sendSelectNode() {
  const { selection } = jsDesign.currentPage
  if (selection.length === 1) { 
    let status = true
    let currentSel = selection[0]
    let datas = null
    while(status) {
      const { name, id } =  currentSel
      if (!currentSel.parent) {
        status = false
        datas = null
        break
      } 
      if (currentSel.parent.type === 'PAGE') {
        status = false
        datas = { name, id}
        break
      }
      currentSel = currentSel.parent
    }
    jsDesign.ui.postMessage({
      type: 'selectionchange:commit',
      datas,
    })
  }
}

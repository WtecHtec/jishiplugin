
jsDesign.showUI(__html__,{ width: 1080, height: 600 });

//监听从 插件ui 发过来的信息
jsDesign.ui.onmessage = msg => {
  if (!msg) return;
  const { type, pluginId, datas } = msg
	if (pluginId !== "a4fIbuyegeVH2F2k0TKRA") return
  if (type === 'create:frame') {
		const selection = jsDesign.currentPage.selection
			console.log('selection---', selection)
      if (Array.isArray(selection) && selection.length === 1) {
        const { name, id, width, height, x, y } = selection[0]
        jsDesign.ui.postMessage({
          type: 'create:frame:done',
          datas: { name, id, properties: { width, height, x, y }  },
        })
      }
  } else if (type === 'animation:frame') {
    console.log('html->ui', datas)
    if (!datas) return
    for (let key in datas) {
      if (key === 'time') continue
      const keySps = key.split('#_#')
      const id = keySps[keySps.length - 1]
      const node = jsDesign.getNodeById(id)
      console.log('html----ui', node)
      const props = datas[key]
      for(let pkey in props) {

      }
    }
  }

};


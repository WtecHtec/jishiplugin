jsDesign.showUI(__html__, { width: 680, height: 440 });

// jsDesign.ui.onmessage = (msg) => {
//   if (msg.type === "create-rectangles") {
//     const nodes = [];

//     for (let i = 0; i < msg.count; i++) {
//       const rect = jsDesign.createRectangle();
//       rect.x = i * 150;
//       rect.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.8, b: 0.8 } }];
//       jsDesign.currentPage.appendChild(rect);
//       nodes.push(rect);
//     }

//     jsDesign.currentPage.selection = nodes;
//     jsDesign.viewport.scrollAndZoomIntoView(nodes);
//   }

//   jsDesign.closePlugin();
// };

jsDesign.on('selectionchange', async () => {
  const selection = jsDesign.currentPage.selection
  if (selection && selection.length === 1) {
    const { width, height } =  selection[0]
    const datas = await selection[0].exportAsync()
    const base64 = jsDesign.base64Encode(datas)
    jsDesign.ui.postMessage( {
      type: 'export',
      datas: base64,
      rect: {
        width,
        height
      }
    })
  }
})


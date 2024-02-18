
jsDesign.showUI(__html__, { width: 260, height: 123 });


function hex2rgb(hex) {
	return [Number('0x' + hex[1] + hex[2]) | 0, Number('0x' + hex[3] + hex[4]) | 0, Number('0x' + hex[5] + hex[6]) | 0];
}

let markId = null;
//监听从 插件ui 发过来的信息
jsDesign.ui.onmessage = msg => {
	if (msg.type === 'createLayer') {

		jsDesign.showUI(__html__, { width: 760, height: 123 });
	}

};


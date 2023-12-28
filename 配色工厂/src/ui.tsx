import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { SliderPicker } from 'react-color';
import { Theme, Color, BackgroundColor } from './index.js';
// import * as Vibrant from 'node-vibrant'
const Vibrant = require('node-vibrant')
import './ui.css'


declare function require(path: string): any

let gray = new BackgroundColor({
	name: 'gray',
	colorKeys: ['#cacaca'],
	ratios: [2, 3, 4.5, 8]
});

let blue = new Color({
	name: 'blue',
	colorKeys: ['#5CDBFF', '#0000FF'],
	ratios: [3, 4.5]
});

let red = new Color({
	name: 'red',
	colorKeys: ['#FF9A81', '#FF0000'],
	ratios: [3, 4.5]
});

let theme = new Theme({ colors: [gray, blue, red], backgroundColor: gray, lightness: 97 });

// returns theme colors as JSON
let colors = theme.contrastColors;
console.log('colors-----', colors)

const COLORS_PALTE = ['Vibrant', 'LightVibrant', 'DarkVibrant', 'Muted', 'LightMuted', 'DarkMuted']
class App extends React.Component {
	textbox: HTMLInputElement
	state: Readonly<{
		showImgSrc,
		defPalette,
		selColor,
	}> = {
			showImgSrc: '',
			defPalette: [],
			selColor: '',
		}
	componentDidMount(): void {
		const showImgDom = document.getElementById('showImg') as HTMLInputElement;
		window.onmessage = async (event) => {
			const { pluginMessage: { datas, rect, type }, } = event.data;
			if (type === 'export') {
				const image = new Image()
				const base64 = `data:image/png;base64,${datas}`
				image.src = base64
				// showImgDom.src = base64
				const { width, height } = rect
				const [nw, nh] = this.scaleImage(width, height, 400, 400)
				showImgDom.style.width = `${nw}px`
				showImgDom.style.height = `${nh}px`
				if (showImgDom.style.display === 'none') showImgDom.style.display = 'block'
				image.onload = () => {
					const vibrant = Vibrant.from(image);
					vibrant.getPalette((err, palette) => {
						console.log('palette----', err, palette)
						if (err || !palette) return;
						const defpal = []
						let vibrantColor = ''
						COLORS_PALTE.forEach(item => {
							const hex = palette[item].getHex()
							defpal.push(this.paleCom(hex, item))
							if (item === 'Vibrant') {
								vibrantColor = hex
							}
						})
						this.setState({
							showImgSrc: base64,
							defPalette: defpal,
							selColor: vibrantColor,
						})
					})
					// vibrant.getSwatches((err, swatches) => console.log('swatches----', err, swatches))

				}
			}
		}
	}

	paleCom = (hex, item) => {
		return <div className="pale_box" title={hex} key={item} style={{ backgroundColor: hex }} onDoubleClick={() => {
			try {
				navigator.clipboard.writeText(hex);
			} catch (err) {
				console.log(err)
			}
		}} > <span> {hex}</span> </div>
	}

	scaleImage(originalWidth, originalHeight, targetWidth, targetHeight) {
		if (originalWidth < targetWidth && originalHeight < targetHeight) {
			return [originalWidth, originalHeight, 1];
		}
		// 计算宽度和高度的缩放比例
		const widthScale = targetWidth / originalWidth;
		const heightScale = targetHeight / originalHeight;
		// 选择较小的缩放比例，以保持宽高比不变
		const scale = Math.min(widthScale, heightScale);
		// 计算新的宽度和高度
		const newWidth = originalWidth * scale;
		const newHeight = originalHeight * scale;
		return [newWidth, newHeight, scale];
	}

	handleChange = color => {
		console.log('handleChange--', color)
		this.setState({
			selColor: `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
		})
	};

	handleColorChange = ({ hex }) => {
		console.log('handleColorChange', hex)
	}


	render() {

		const { showImgSrc, defPalette, selColor } = this.state
		return <div className="main_container">
			<div className="config_container">
				<span style={{ fontSize: '12px', color: 'red', }}> *双击复制 </span>
				{
					defPalette && defPalette.length > 0 && <div className="box flex">  {defPalette} </div>
				}
				{
					selColor && <div>
						主色：
						<SliderPicker color={selColor} onChange={this.handleChange} onChangeComplete={this.handleColorChange} />
					</div>
				}
			</div>
			<div className="img_container">
				<img id="showImg" style={{ 'display': 'none' }} src={showImgSrc}></img>
			</div>
		</div>
	}
}

ReactDOM.render(<App />, document.getElementById('react-page'))

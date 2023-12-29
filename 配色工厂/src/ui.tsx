import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { SketchPicker } from 'react-color';
import { Theme, Color, BackgroundColor } from './index.js';
import axios from 'axios';
import { THEMES } from './theme.config.js'
// import * as Vibrant from 'node-vibrant'
// const Vibrant = require('node-vibrant')
import './ui.css'

import chroma from 'chroma-js';

// // 创建一个颜色对象
// const color = chroma('#6fa3f7'); // 蓝色

// // 获取RGBA格式的颜色值
// const rgba = color.rgba(); // 返回一个数组，例如：[111, 163, 247, 1]

// console.log(rgba); // 输出RGBA颜色值

declare function require(path: string): any

// let baseColor = new BackgroundColor({
// 	name: 'gray',
// 	colorKeys: ['#fffefb'],
// 	ratios: [21]
// });

// // // #5d5e5f;  #78797a
// let bg = new Color({
// 	name: 'bg',
// 	colorKeys: [  '#ffffff', '#fffefb',],
// 	ratios: [1.32],

// });


// let theme = new Theme({ colors: [bg], backgroundColor: baseColor, lightness: 100 });

// let colors = theme.contrastColorValues;
// console.log('colors-----', colors, theme)




function getMutliLevelProperty(ctx, path, defaultVal) {
	let res = defaultVal;
	if (!(typeof path === 'string') || !isObject(ctx)) return res;
	let key = path.replace(/\[(\w+)\]/g, '.$1');
	key = key.replace(/^\./, '');
	const arr = key.split('.');
	for (let i = 0, count = arr.length; i < count; i++) {
		const p = arr[i];
		if ((isObject(ctx) || Array.isArray(ctx)) && p in ctx) {
			ctx = ctx[p];
		} else {
			return res;
		}
	}
	res = ctx;
	return res;
}

function isObject(obj) {
	var type = typeof obj;
	return type === 'function' || type === 'object' && !!obj;
}



const THEME_KEYS = [
	'background',
	'bg200',
	'bg300',
	'primary',
	'primary200',
	'primary300',
	'accent',
	'accent200',
	'text',
	'text200',]

// 对比
const COLOR_CONTRAST = {
	'background': {
		update: ['bg200', 'bg300'],
		value: [1.09, 1.6]
	},
	'primary': {
		update: ['primary200', 'primary300'],
		value: [1.32, 1.38]
	},
	'accent': {
		update: ['accent200'],
		value: [2.77]
	},
	'text': {
		update: ['text200',],
		value: [1.32]
	},
}

class App extends React.Component {
	textbox: HTMLInputElement
	state: Readonly<{
		showImgSrc,
		defPalette,
		themes,
		currentOpt,
		currentThemeIdx,
		currentTheme,
		editKey,
		editColor,
		searchTheme,
		searchStatus,
	}> = {
			showImgSrc: '',
			defPalette: [],
			themes: [...THEMES],
			currentOpt: 'themes',
			currentThemeIdx: 0,
			currentTheme: { ...THEMES[0] },
			editKey: '',
			editColor: '',
			searchTheme: null,
			searchStatus: false,
		}
	componentDidMount(): void {
		document.addEventListener('click', (e) => {
			console.log('document----', e)
			const className = getMutliLevelProperty(e, 'target.className', '-1')
			if (className === 'picker_masker') {
				this.setState({
					editKey: '',
				})
			}
		})
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
		// console.log('handleChange--', color)
		const { currentTheme, editKey } = this.state
		const newColor = color.hex.length === 7 ? color.hex : `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
		const update = { ...currentTheme }
		update[editKey] = newColor
		this.formatColorContrast(editKey, newColor, COLOR_CONTRAST, update, update.background)
		// if (COLOR_CONTRAST[editKey]) {
		// 	const { value, update: updateKeys } = COLOR_CONTRAST[editKey]
		// 	const baseColor = new BackgroundColor({
		// 		name: 'base',
		// 		colorKeys: [newColor],
		// 		ratios: [21]
		// 	});
		// 	// #5d5e5f;  #78797a
		// 	const bg = new Color({
		// 		name: 'bg',
		// 		colorKeys: [newColor],
		// 		ratios: [...value]
		// 	});
		// 	const theme = new Theme({ colors: [bg], backgroundColor: baseColor, lightness: 100 });
		// 	const colors = theme.contrastColorValues;
		// 	updateKeys.forEach((key, index) => {
		// 		update[key] = colors[index]
		// 		if (colors[index].length > 7) {
		// 			const color = chroma(colors[index]);
		// 			// 获取RGBA格式的颜色值
		// 			const rgba = color.rgba(); // 返回一个数组，例如：[111, 163, 247, 1]
		// 			update[key] = `rgba(${rgba.join(',')})`
		// 		}
		// 	})
		// }
		this.setState({
			currentThemeIdx: -1,
			editColor: newColor,
			currentTheme: { ...update }
		})
	};

	handleColorChange = ({ hex }) => {
		console.log('handleColorChange', hex)
	}

	handleClickTheme = (e) => {
		// console.log('handleClickTheme', e)
		const index = getMutliLevelProperty(e, 'target.dataset.index', '-1')
		const type = getMutliLevelProperty(e, 'target.dataset.type', '-1')
		let { currentThemeIdx, searchTheme } = this.state
		if (type === 'searchtheme') {
			this.setState({
				currentOpt: 'edit',
				currentTheme: { ...searchTheme }
			})
			return
		}
		if (index !== '-1' && type === 'themes' && currentThemeIdx !== Number(index)) {
			currentThemeIdx = Number(index)
			const { themes } = this.state
			this.setState({
				currentThemeIdx,
				currentTheme: { ...themes[currentThemeIdx] }
			})
		}
	}
	handleClickOpt = (e) => {
		const type = getMutliLevelProperty(e, 'target.dataset.type', '-1')
		console.log('type---', e, type)
		if (type !== '-1') {
			this.setState({
				currentOpt: type,
			})
		}
	}

	formatTheme = (currentTheme) => {
		const result: any = {
			background: {
				attrkey: 'backgroundColor',
				defval: '',
				value: {}
			},
			bg200: {
				attrkey: 'backgroundColor',
				defval: '',
				value: {}
			},
			bg300: {
				attrkey: 'backgroundColor',
				defval: '',
				value: {}
			},
			bg300bd: {
				attrkey: 'border',
				defval: '4px solid []',
				value: {}
			},
			primary: {
				attrkey: 'backgroundColor',
				defval: '',
				value: {}
			},
			primary200: {
				attrkey: 'borderRight',
				defval: '2px solid []',
				value: {}
			},
			primary300: {
				attrkey: 'color',
				defval: '',
				value: {}
			},
			accent: {
				attrkey: 'color',
				defval: '',
				value: {}
			},
			accent200: {
				attrkey: 'backgroundColor',
				defval: '',
				value: {}
			},
			text: {
				attrkey: 'color',
				defval: '',
				value: {}
			},
			text200: {
				attrkey: 'color',
				defval: '',
				value: {}
			}
		}
		THEME_KEYS.forEach(key => {
			if (currentTheme[key]) {
				const { attrkey } = result[key]
				result[key].value[attrkey] = result[key].defval ? result[key].defval.replace('[]', currentTheme[key]) : currentTheme[key]
				if (key === 'bg300') {
					const nkey = 'bg300bd'
					const { attrkey: nattrkey } = result[nkey]
					result[nkey].value[nattrkey] = result[nkey].defval ? result[nkey].defval.replace('[]', currentTheme[key]) : currentTheme[key]
				}
			}
		})
		return result
	}

	inputRef = (e) => {
		this.textbox = e
	}
	formatColorContrast = (editKey, newColor, colorContast, update, bgColor) => {
		let status = false;
		if (colorContast[editKey]) {
			status = true
			const { value, update: updateKeys } = colorContast[editKey]
			const baseColor = new BackgroundColor({
				name: 'base',
				colorKeys: [newColor],
				ratios: [1.31]
			});
			// #5d5e5f;  #78797a
			const bg = new Color({
				name: 'bg',
				colorKeys: [newColor],
				ratios: [...value]
			});
			const theme = new Theme({ colors: [bg], backgroundColor: baseColor, lightness: 100, contrast: 1 });
			// console.log(theme)
			const colors = theme.contrastColorValues;
			updateKeys.forEach((key, index) => {
				update[key] = colors[index]
				if (colors[index].length > 7) {
					const color = chroma(colors[index]);
					// 获取RGBA格式的颜色值
					const rgba = color.rgba(); // 返回一个数组，例如：[111, 163, 247, 1]
					update[key] = `rgba(${rgba.join(',')})`
				}
			})
		}
		return [status, update]
	}
	genThemeData = (themeData) => {
		const result = { ...themeData }
		Object.keys(result).forEach(key => {
			this.formatColorContrast(key, result[key], COLOR_CONTRAST, result, result.background)
		})
		if (Object.keys(result).length === 10) return [true, result]
		return [false, {}]
	}
	handleGen = () => {
		const searchTxt = this.textbox.value
		console.log(searchTxt)
		if (searchTxt) {
			this.setState({
				searchStatus: true
			})
			axios.post('https://jsuifmbqefnxytqwmaoy.functions.supabase.co/chatgpt', { "query": searchTxt })
				.then(res => {
					console.log('handleGen---', res)
					const content = getMutliLevelProperty(res, 'data.text.content', '')
					try {
						const themeData = JSON.parse(content)
						console.log('themeData---', themeData)
						if (Object.keys(themeData).length === 4) {
							const [status, result] = this.genThemeData(themeData)
							if (!status) {
								this.errorGen()
								return
							}
							this.setState({
								searchTheme: { ...result },
								searchStatus: false,
							})
							return
						}
						this.errorGen()
					} catch (error) {
						this.errorGen()
					}
				}).catch(err => {
					this.errorGen()
				})

		}
	}

	errorGen = () => {
		this.setState({
			searchStatus: false
		})
		alert('生成失败')
	}
	render() {
		const { currentOpt, themes, currentThemeIdx, currentTheme, editKey, editColor, searchTheme, searchStatus } = this.state
		const theme = this.formatTheme(currentTheme)
		return <div className="main_container">
			<div className="opt_container" onClick={this.handleClickOpt}>
				<div title="主题库" className={`opt_item ${currentOpt === 'themes' && 'active'}`} data-type="themes" >
					<img src={require('./theme.svg')} className="opt_img"></img>
					{/* <div className="opt_txt">库</div> */}
				</div>
				<div title="修改" className={`opt_item ${currentOpt === 'edit' && 'active'}`} data-type="edit">
					<img src={require('./edit.svg')} className="opt_img"></img>
					{/* <div className="opt_txt">修改</div> */}
				</div>
				<div title="搜索" className={`opt_item ${currentOpt === 'search' && 'active'}`} data-type="search">
					<img src={require('./search.svg')} className="opt_img"></img>
					{/* <div className="opt_txt">修改</div> */}
				</div>
			</div>
			<div className="config_container">
				{
					currentOpt === 'themes' && <div className="themes_main" onClick={this.handleClickTheme} > {themes.map((item, index) => <div key={index} className={`thems_item ${currentThemeIdx === index && 'active'}`} data-type="themes" data-index={index}>
						{
							THEME_KEYS.map((key) => <div className="pale_box" style={{ backgroundColor: item[key] }}></div>)
						}
					</div>)
					}
					</div>
				}
				{
					currentOpt === 'edit' && currentTheme && <div className="edit_main">
						{
							THEME_KEYS.map(key => !!currentTheme[key] && <div className="edit_item" >
								<div className="edit_title"> {key}：</div>
								<div className="edit_tip">
									<div className="tip_text"> {currentTheme[key]} </div>
									<div className="tip_circle" onClick={() => {
										this.setState({
											editKey: key,
											editColor: currentTheme[key]
										});
									}} style={{ backgroundColor: currentTheme[key] }}> </div>
								</div>
								{
									editKey === key && <div className="color_picker">
										<div className="picker_masker"></div>
										<SketchPicker color={editColor} onChange={this.handleChange} onChangeComplete={this.handleColorChange} />
									</div>
								}

							</div>)
						}

					</div>
				}
				{
					currentOpt === 'search' && <div className="search_main">
						<div className="input_main">
							<input type="text" ref={this.inputRef} className="search_input" placeholder="如:(科技黑),最好英文!"></input>
							<div className="search_btn" onClick={this.handleGen}>
								{!searchStatus ? '立即生成' : '正在生成'}</div>
						</div>
						{
							searchTheme && <div className={`thems_item`} onClick={this.handleClickTheme} data-type="searchtheme">
								{
									THEME_KEYS.map((key) => <div className="pale_box" style={{ backgroundColor: searchTheme[key] }}></div>)
								}
							</div>
						}
					</div>
				}
			</div>
			<div className="img_container">
				<div className="main_container_phone background bg-300-bd" style={{ ...theme.background.value, ...theme.bg300bd.value }}>
					<div className="top_block bg-300" style={{ ...theme.bg300.value }}></div>
					<div className="title_desc">
						<div className="title text text_color" style={{ ...theme.text.value }}>配色工厂</div>
					</div>
					<div className="sub_desc text-200" style={{ ...theme.text200.value }}>&nbsp;&nbsp;&nbsp;&nbsp;专为设计师提供智能配色方案，利用AI技术根据关键字生成独特搭配。拥有丰富色彩库和调色功能，适合专业设计师和初学者。让创意设计更高效、简便，为作品赋予丰富色彩。</div>
					<div className="primary_main">
						<div className="primary_content primary" style={{ ...theme.primary.value }}>
							<div className="primary_item primary-200 primary-300" style={{ ...theme.primary200.value, ...theme.primary300.value }}>
								<div className="primary_title">活动</div>
								<div className="primary_desc">392千卡</div>
							</div>
							<div className="primary_item primary-200 primary-300" style={{ ...theme.primary200.value, ...theme.primary300.value }}>
								<div className="primary_title">锻炼</div>
								<div className="primary_desc">30分钟</div>
							</div>
							<div className="primary_item primary-200 primary-300" style={{ ...theme.primary200.value, ...theme.primary300.value }}>
								<div className="primary_title">站立</div>
								<div className="primary_desc">10小时</div>
							</div>
						</div>
					</div>
					<div className="accent_main">
						<div className="accent_content bg-200" style={{ ...theme.bg200.value, }}>
							<div className="accent_title">
								<div className="ac_text text_color" style={{ ...theme.text.value, }}>最新咨询</div>
								<div className="accent_tip accent accent-200" style={{ ...theme.accent200.value, ...theme.accent.value, }}> NEW </div>
							</div>
							<div className="accent_desc text-200" style={{ ...theme.text200.value, }}>喜欢就点亮心心</div>
						</div>
					</div>
					{
						currentTheme && Object.keys(currentTheme).length > 0 && <div className="accent_main theme_show">
							{
								THEME_KEYS.map((key) => <div className="pale_box" style={{ backgroundColor: currentTheme[key] }}></div>)
							}
						</div>
					}
				</div>
			</div>
		</div>
	}
}

ReactDOM.render(<App />, document.getElementById('react-page'))

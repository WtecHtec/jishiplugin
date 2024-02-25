// pages/show/index.js

const app = getApp()
const { designDatas } = app.globalData
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		pageStatus: false,
		showData: {},
		vpUrl: app.vpUrl,
		showEvents: [],

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		wx.showLoading()
		const { fromId, isFirst } = options
		if (isFirst === '1') {
			this.setData({
				showData: designDatas[0],
				pageStatus: true,

			})
		} else {
			const fdt = designDatas.find(({ id }) => id === fromId)
			if (fdt) {
				this.setData({
					showData: fdt,
					pageStatus: true,
				}, () => {

				})
			} else {
				wx.showToast({
					title: '数据异常',
					icon: 'none'
				})
			}
		}
		wx.hideLoading()
	},

	bindload(event) {

		const query = wx.createSelectorQuery()
		query.select('#vpshowimg').boundingClientRect()
		query.exec((res) => {
			console.log(res)
			const { width, height } = res[0]
			const { showData } = this.data
			console.log('event.detail', showData, event.detail)
			const { events, rect } = showData
			if (Array.isArray(events)) {
				const wScale = width / rect.width
				const hScale = height / rect.height
				events.forEach(item => {
					const x = item.x * wScale
					const w = item.w * wScale
					const y = item.y * hScale
					const h = item.h * hScale
					item.style = `width:${w}px;height:${h}px;top:${y}px;left:${x}px;`
				})
				this.setData({
					showEvents: events,
				})
			}
		})
	},

	binderror() { },

	bindToId(event) {
		console.log(event)
		const { item } = event.target.dataset
		wx.navigateTo({
			url: `/pages/show/index?fromId=${item.toId}&isFirst=0`
		})
	},









})
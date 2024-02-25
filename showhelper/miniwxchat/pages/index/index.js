const app = getApp()
Page({
	data: {

	},
	onLoad(options) {
		const { fromType, sourceId } = options
		// let sourceId = '6407e807c1bb4e25e60f1eb8'
		// 请求接口
		if (sourceId) {
			wx.showLoading()
			wx.request({
				url: `${app.apiUrl}/getvp/${sourceId}`, //仅为示例，并非真实的接口地址
				header: {
					'content-type': 'application/json' // 默认值
				},
				success: (res) => {
					console.log(res.data)
					if (res.data) {
						app.globalData.designDatas = res.data
						wx.redirectTo({
							url: `/pages/show/index?fromId=0&isFirst=1`
						})

					} else {
						wx.showToast({
							title: '数据异常',
							icon: 'none'
						})
					}
				},
				fail: (err) => {
					console.log('fail---', err)
					wx.showToast({
						title: '数据异常',
						icon: 'none'
					})
				},
				complete: () => {
					wx.hideLoading()
				}
			})
		}
	},
	copyText: function () {
		wx.setClipboardData({
			data: 'b-b-bigbelly',
			success: function () {
				wx.showToast({
					title: '复制成功',
					icon: 'success',
					duration: 1500
				});
			}
		});
	},


})

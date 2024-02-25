// app.js
const base = 'https://luckcar.top/vpserver/'
// const base = 'http://127.0.0.1:3299'
App({
	onLaunch() {

	},
	apiUrl: base,
	vpUrl: `${base}/vp/`,
	globalData: {
		designDatas: [
			{
				id: '',
				url: '',
				rect: {
					width: 0,
					height: 0,
				},
				events: [
					{
						id: '1',
						toId: '1',
						x: '',
						y: '',
						w: '',
						h: ''
					}
				]
			}
		]
	}
})

//express_demo.js 文件
const express = require('express');
const { uid } = require('uid')
const cors = require('cors');
const fs = require('fs');

const app = express();
const post = 8081
const EXP_TITLE = '###TITLE###'
const EXP_CONTENT = '###CONTENT###'
const EXP_WIDTH = '###WIDTH####'
const EXP_HEIGHT = '###HEIGHT####'
const dname = 'https://luckcar.top/pptback'
let USERS = []
let redisData = {};
let TEMP = ''


app.use('/ppts', express.static('./pptfiles'));
app.use(cors());
app.get('/config', function (req, res) {
	try {
		const data = fs.readFileSync('./userconfig.txt', 'utf8');
		// parse JSON string to JSON object
		console.log('data---', data)
		data && (USERS = data.split(',').filter(item => item && item !== '\n'))
	} catch (err) {
		console.log(`Error reading file from disk: ${err}`);
	}
	console.log('req.query', req.query)
	res.json({ authusers: USERS })
})

app.get('/export', function (req, res) {
	// console.log('req.query----', req.query)
	const { infoid, pptlen, infoname, pptcurrent, pptdata, pptw, ppth } = req.query
	if (pptcurrent === 1) {
		redisData[infoid] = pptdata || ''
	} else {
		redisData[infoid] = `${redisData[infoid] || ''}${pptdata}`
	}
	if (pptlen === pptcurrent) {
		try {
			TEMP = fs.readFileSync('./temp_config.txt', 'utf8');
		} catch (err) {
			console.log(`Error reading file from disk: ${err}`);
		}
		const pptcontent = TEMP.replace(EXP_TITLE, `${infoname}的PPT`)
			.replace(EXP_CONTENT, decodeURIComponent(redisData[infoid]))
			.replace(EXP_WIDTH, pptw)
			.replace(EXP_HEIGHT, ppth)
		try {
			const fileName = `${uid()}.html`
			fs.writeFileSync(`./pptfiles/${fileName}`, pptcontent);
			// parse JSON string to JSON object
			redisData[infoid] = '';
			res.json({ status: 1, ppturl: `${dname}${fileName}` })
		} catch (err) {
			console.log(`Error reading file from disk: ${err}`);
			redisData[infoid] = '';
			res.json({ status: -1, })
		}
		return
	}
	res.json({ status: 0, })
})



const server = app.listen(post, function () {

	const host = server.address().address
	const port = server.address().port

	console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
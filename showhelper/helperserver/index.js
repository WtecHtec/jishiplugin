
const express = require('express');
const { uid, } = require('uid')
const multer = require('multer')

const cors = require('cors');
const path = require('path')
const fs = require('fs');

const { getRequest, postRequest } = require('./request');

const app = express();
const post = 3299



app.use('/vp', express.static(path.join(__dirname, './uploads')));
app.use(cors());



const fileFilter = function (req, file, cb) {
	// 只接受 jpg 和 png 类型的图片文件
	if (file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		const error = new Error('Invalid file type, only JPEG and PNG is allowed!');
		error.code = 'INVALID_FILE_TYPE';
		cb(error, false);
	}
};

// const upload = multer({ dest: path.join(__dirname, './uploads') }) // 要存放文件的路径
const upload = multer({
	fileFilter: fileFilter,
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, path.join(__dirname, './uploads'))
		},
		filename: function (req, file, cb) {
			// fieldname是表单的name值，也就是我们设定的“logo”，
			// originalname是文件上传时的名字，可以根据它获取后缀，
			// encoding，mimetype 我就不详细介绍了，可以自行输出查看。
			const { fieldname, originalname, encoding, mimetype } = file
			console.log('originalname---', originalname)
			const after = originalname.split('.')[1] ? '.' + originalname.split('.')[1] : '.png'
			cb(null, originalname);
		}
	})
})


app.get('/getvp/:sourceId', (req, res) => {
	const sourceId = req.params.sourceId;
	fs.readFile(path.join(__dirname, './uploads/', `${sourceId}.json`), 'utf8', (err, data) => {
		if (err) {
			res.send('');
		} else {
			const jsonData = JSON.parse(data);
			// console.log('JSON data:', jsonData);
			res.json(jsonData);
		}
	});
});

function getWxKey() {
	// const secret = 'a4d86cfd774e84d831b4ffa0fd498cff'
	// const appid = 'wxa27a95e5f546c668'

	const secret = 'cbfab2e36bce1252eb32035a3024da7d'
	const appid = 'wx5b8c0dadaa80810d'
	const getUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`
	return new Promise((resolve) => {
		getRequest(getUrl)
			.then((data) => {
				console.log('GET request data:', data)
				if (data && data.errcode) {
					resolve('')
				}
				resolve(data.access_token || '')
			})
			.catch((err) => {
				console.error('Error in GET request:', err)
				resolve('')
			});
	})
}

function getCode(userId, attoken) {
	// const postUrl = `https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=${attoken}`
	// const postData = {
	// 	path: `pkgVp/pages/index/index?source=${userId}`,
	// 	 "env_version": "trial",
	// }


	// const postUrl = `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${attoken}`
	// const postData = {
	// 	"scene": 'a=1',
	// 	"page": `pkgVp/pages/index/index`,
	// 	"width": 430,
	// 	"env_version": "trial",
	// 	check_path: false,
	// }


	// console.log(postData.scene.length)
	return new Promise((resolve) => {
		postRequest(postUrl, postData)
			.then((data) => {
				console.log('POST request data:', data)
				try {
					const { errcode, errmsg } = JSON.parse(data.toString())
					console.log(errcode, errmsg)
					resolve('')
				} catch (error) {
					resolve(data)
				}
			})
			.catch((err) => {
				console.error('Error in POST request:', err)
				resolve('')
			});
	})
}

function saveImg(imgbuffer, pathfile) {
	// 将 Buffer 保存为文件
	// const imageBuffer = Buffer.from(imgbuffer);
	return new Promise((resolve) => {
		fs.writeFile(pathfile, imgbuffer, (err) => {
			if (err) {
				console.error('Error saving image:', err);
				resolve('')
			} else {
				console.log('Image saved successfully');
				resolve(true)
			}
		});
	})

}

app.post('/api/upload/file', upload.array('image'), (req, res) => {
	// console.log('body--', req.body)
	// console.log('file---', req.files)
	const { configDatas, userId } = req.body

	const jsonData = JSON.parse(configDatas)
	if (!userId || !Array.isArray(jsonData) || !req.files || jsonData.length !== req.files.length) {
		res.status(500).send('error')
		return
	}
	jsonData.forEach((item, i) => {
		item.url = req.files[i].filename
	})

	fs.writeFile(path.join(path.join(__dirname, `./uploads/`), `${userId}.json`), JSON.stringify(jsonData, null, 2), 'utf8', async (err) => {
		if (err) {
			console.error('Failed to write file:', err);
			res.status(500).send('error')
		} else {
			console.log('JSON data saved to file');
			const aukey = await getWxKey()
			if (aukey) {
				const imgbuffer = await getCode(userId, aukey)
				if (imgbuffer) {
					const status = await saveImg(imgbuffer, path.join(__dirname, './uploads', `${userId}_qr.png`))
					if (status) {
						res.status(200).send(`${userId}.png`)
					} else {
						res.status(500).send('error')
					}
					return
				}
				res.status(500).send('error')
				return
			} else {
				res.status(500).send('error')
			}
			// res.status(200).send('success')
		}
	});

})


function getUploadFolder(userId) {
	const folderPath = path.join(__dirname, `./uploads/${userId}`)
	if (!fs.existsSync(folderPath)) {
		// 文件夹不存在，创建文件夹
		try {
			fs.mkdirSync(folderPath);
			console.log('Folder created successfully');
			return folderPath
		} catch (err) {
			console.error('Failed to create folder:', err);
			return ''
		}
	} else {
		console.log('Folder already exists');
		return folderPath
	}
}
// 错误处理中间件
// app.use(function (err, req, res, next) {
// 	console.log('errr', err.code)
// 	if (err.code === 'INVALID_FILE_TYPE') {
// 		res.status(500).send('Invalid file type, only PNG is allowed!');
// 	} else {
// 		res.status(500).send('Internal Server Error');
// 	}
// });

const server = app.listen(post, function () {

	const host = server.address().address
	const port = server.address().port

	console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
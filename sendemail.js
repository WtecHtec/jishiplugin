const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

app.use(cors());
// 使用body-parser处理JSON请求体
//app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const sendEmail = async (toemail, emaildatas,) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 587,
    secure: false,
    secureConnection: true,
    auth: {
      user: '1079463751@qq.com',
      pass: 'zbqflmhkxccfhced',
    },
  });
  let html = ''
  const attachments = []
  emaildatas.forEach((item) => {
    if (item && item.base64 && item.id) {
      html = `${html}<h1></h1> <img src="cid:${item.id}"/>`
      attachments.push({
        filename: item.id + '.png',
        content: Buffer.from(item.base64, 'base64'), cid: item.id
      })
    }
  })
  // 设置电子邮件选项
  let mailOptions = {
    from: '1079463751@qq.com', // 发件人地址
    to: toemail, // 收件人地址，多个收件人用逗号分隔
    subject: '一键汇报', // 主题
    text: '', // 纯文本正文
    html,
    attachments,
    // html: '<h1></h1> <img src="cid:image1"/>',
    // attachments: [
    //   {
    //     filename: 'image.jpeg',
    //     content: Buffer.from(''
    //     , 'base64'), cid: 'image1'
    //   }
    // ]
  };

  // 发送电子邮件
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return 'ok'
 } catch (error) {
    console.error('Error occurred while sending email:', error);
    return 'error'
}
}






// 创建POST路由
app.post('/sendmail', async (req, res) => {
//  console.log('Received POST request:', req.body);
  const { toemail, emaildatas } = req.body
  if (!toemail || !Array.isArray(emaildatas)) {
   // res.send(500)
   res.send('error')
    return
  }
  const status = await  sendEmail(toemail, emaildatas);
  res.send(status)
});

// 启动服务器
const port = 4599;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

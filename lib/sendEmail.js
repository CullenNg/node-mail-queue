const nodemailer = require('nodemailer');

// SMTP服务器配置
const smtpServer = {
    service: 'QQex',
    host: 'smtp.exmail.qq.com',
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
        user: 'from@qq.com',
        pass: 'password',
    }
};

/**
 * 发送邮件
 * @param {String} to 收件人
 * @param {String} title 邮件标题
 * @param {String} subject 副标题
 * @param {String} content 邮件内容
 */
module.exports = ({
    to,
    title,
    subject,
    content
}) => {
    // 配置邮件服务器
    const transporter = nodemailer.createTransport(smtpServer);

    // 邮件信息
    let mailOptions = {
        from: smtpServer.auth.user,
        to,
        subject: subject || title,
        html: content
    };

    // send mail with defined transport object
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return reject(error);
            } else {
                return resolve(`发送邮件：${to} success`);
            }
        });
    })
};
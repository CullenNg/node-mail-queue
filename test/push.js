const Redis = require("ioredis");

// Redis服务器配置
const redisServer = {
    port: 6379,
    host: '127.0.0.1',
    password: '',
    db: 0,
}

// 链接Redis
const redis = new Redis(redisServer);

// 邮件相关数据
const mailData = {
    to: 'to@qq.com',
    title: 'title',
    content: 'content'
}

// 间隔2秒增加1条邮件数据到队列里面
setInterval(() => {
    redis.rpush('MAIL_TASK_PENDDING', JSON.stringify(mailData));
}, 2000);


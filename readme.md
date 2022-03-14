# 简介
通过 Node Redis NodeMailer 实现异步队列发送邮件业务

### 必要的配置项
1. Redis服务器相关参数  ```index.js```、```test/push.js```, 
```js
// Redis服务器配置
const redisServer = {
    port: 6379,
    host: '127.0.0.1',
    password: '',
    db: 0,
}
```

2. 邮件SMTP服务器配置  ```lib/sendEmail.js```
```js
// SMTP服务器配置
const smtpServer = {
    ...
}
```

### 运行

1. 运行主程序
```bash
# 普通运行
node index.js

# 多进程运行
pm2 start ecosystem.config.js
```

2. 再运行推送测试数据到Redis的后台脚本
```
node test/push.js
```
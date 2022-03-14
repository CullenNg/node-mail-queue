const Redis = require("ioredis");
const sendEmail = require('./lib/sendEmail');

const redisKey = {
    pendding: 'MAIL_TASK_PENDDING',
    success: 'MAIL_TASK_SUCCESS',
}

// 任务重试的时间间隔 - 10秒
const retryInterval = 1000;

// Redis服务器配置
const redisServer = {
    port: 6379,
    host: '127.0.0.1',
    password: '',
    db: 0,
}

// 链接Redis
const redis = new Redis(redisServer);

/**
 * 任务执行成功
 * @param {Object} data
 */
const excuteSuccess = (data) => {
    redis.rpush(redisKey.success, JSON.stringify(data))
}

/**
 * 任务执行失败，队尾插入任务
 * @param {Object} data 
 */
const excuteFaild = (data) => {
    redis.rpush(redis.pendding, JSON.stringify(data))
}

/**
 * 加载任务
 * @returns {Promise}
 */
const loadTask = () => {
    return new Promise(async (resolve, reject) => {
        const str = await redis.lpop(redisKey.pendding)
        if (str == null) {
            return resolve()
        }
        try {
            let data = JSON.parse(str)
            resolve(data)
        } catch (error) {
            reject()
        }
    })
}

/**
 * 主程序运行
 */
const main = () => {
    // 循环加载任务
    const loop = () => {
        loadTask().then(res => {
            sendEmail(res)
                .then(() => excuteSuccess(res))
                .catch(() => excuteFaild(res))
                .finally(loop);
        }).catch(() => {
            // 没有数据的话N秒后再重新加载任务
            console.log('没有任务呢, 10秒后重新抓取')
            setTimeout(loop, retryInterval);
        });
    }
    loop();
}
main();

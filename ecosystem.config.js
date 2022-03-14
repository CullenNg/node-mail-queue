module.exports = {
    apps : [{
        name   : "Node Mailer",
        script : "./index.js",
        env: {
            NODE_ENV: "production"
        },
        watch: true,
        instances : "max",
        exec_mode : "cluster"
    }]
}

/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-03-14 15:51:53
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-06-20 15:16:08
 * @FilePath: \vue3project\server\index.js
 * @Description: node 服务配置
 */
const express = require('express')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const http = require('http')
const redis = require('redis')
const { redisConfig } = require('./config/config')
const RedisStore = require('connect-redis')(expressSession)
const { setRoute } = require('./utils/setRoute')
const routes = require('./routes/index')

// 创建 Redis 连接
const redisClient = redis.createClient(redisConfig)

redisClient.on('connect', () => {
    console.log('Reids client connected')
})
redisClient.on('error', (e) => {
    console.error(e)
})

const contextPath = '/api'
const requestLimit = '10240kb'
const port = 3000
const app = express()

// 处理 POST 请求的请求体
app.use(bodyParser.urlencoded({ extended: false, limit: requestLimit }))
app.use(bodyParser.json({ limit: requestLimit }))

app.set('x-powered-by', false)
app.all('*', (req, res, next) => {
    // 开启跨域
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    const origin = req.get('Origin')
    if (origin) res.setHeader('Access-Control-Allow-Origin', origin)

    // 允许跨域请求的方法
    res.setHeader(
        'Access-Control-Allow-Methods',
        'POST, GET, OPTIONS, DELETE, PUT'
    )

    // 允许跨域请求 header 携带的东西
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since, token'
    )
    next()
})

// 设置 Express 的 Session 中间件
const sessionOptions = {
    store: new RedisStore({ client: redisClient }), // store session存储实例，默认为一个新的 MemoryStore 实例
    name: 'session_id', // 默认connect.sid
    secret: 'Sora', // 签名密钥
    resave: false, // 强制保存, 当 session 没有被修改也要重新保存
    saveUninitialized: true, // 如果原先没有 session 那么就设置, 否则不设置(强制保存未初始化的 session)
    rolling: true, // 每次请求更新有效时长
    cookie: {
        // domain: ''  // 需要共享 cookie 时设置
        maxAge: 1 * 24 * 60 * 60 * 1000, // 一天后过期
        httpOnly: true // 是否允许客户端修改 cookie(默认为 true 不能被修改)
    }
}

app.use(expressSession(sessionOptions))

const service = http.createServer(app)

// 设置路由
routes.forEach(route => {
    app[route.method](contextPath + route.path, setRoute(route.method, route.handler))
})

service.listen(port, () => {
    const url = `http://localhost:${port + contextPath}`
    console.log(`service start at ${url}, env = ${process.env.NODE_ENV}`)
})

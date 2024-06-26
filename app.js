const Koa = require('koa2')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const json = require('koa-json')
const jwt = require('koa-jwt')
const cors = require('koa2-cors')
const koaBody = require('koa-body')

const { proxyOptions } = require("./service/proxyService")

const dirImport = require('./common/dirImport')
const config = require('./config/default')
const errorHandle = require('./middlewares/errorHandle')
const verifyToken = require('./middlewares/verifyToken')
var proxy = require('koa2-nginx');

const app = new Koa()

// 完善页面错误提示
onerror(app)

app.use(cors({}));
app.use(proxy(proxyOptions));
app.use(require('koa-static')(__dirname + '/public'))
app.use(verifyToken())
app.use(errorHandle)
app.use(jwt({ secret: 'secret', passthrough: false }).unless({
	path: [
		/^\/admin\/login/,
		/^\/admin\/register/,
		/^((?!\/admin).)*$/ //设置需要认证的接口地址，其余接口不需要认证
	]
}))
app.use(koaBody({
	multipart: true,
	formidable: {
		maxFileSize: 300 * 1024 * 1024    // 设置上传文件大小最大限制，默认3M
	}
}))
app.use(logger())
app.use(json())

// 自动加载routers下路由文件
dirImport.routes(app, __dirname + '/routes/')

// 错误处理
app.on('error', (err, ctx) => {
	console.log(new Date() + '  server error', err)
})

// 启动
app.listen(config.port)
console.log(`app started at port ${config.port}...`)

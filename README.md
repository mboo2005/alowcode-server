# alowcode-server

> 基于百度开源的amis服务实现的低代码平台server端

什么是alowcode，alowcode是一个开源的低代码平台，非常适合业务有自己的服务端，需要做一个mis后台给管理员使用，方便管理一些业务功能，比如需要查看注册用户列表，查看当天统计数据等。常见的开发方式是前端写页面，调用后端接口，这样工作量比较大，但对于后台页面，完全可以有低代码平台来解决。在百度内部，有这样一个非常好用的系统，对外付费版是爱速搭，如果有钱的企业可以直接采购爱速搭，功能很强大，也可以私有化部署。对于小型企业，想有一个免费的、可控的低代码平台，可以考虑alowcode。

alowcode分服务端和前端，服务端是alowcode-server，前端是alowcode-web

演示环境：..

## 实现功能
### 用户体系，登陆注册
### 用户权限
RBAC(Role Based Access Control)基于角色的权限控制系统，可以到控制权限到页面级别，内部按钮级别待开发

总体实现框架为

```
【用户】--属于-->【角色】--具有-->【权限】
【页面】--需要-->【权限】
  用用户的权限和页面权限对比检查
```
### 页面管理
在alowcode低代码平台创建的页面对应管理端

### 代理服务
alowcode平台给第三方服务发送的请求有代码服务统一转发，这样有3个好处：
1. alowcode服务server可以和业务server部署到同一机房实现内网访问，避免管理功能泄露到外网
1. 业务server不需要处理跨域请求等问题
1. 业务server需要的鉴权等操作可以有proxy实现（需要定制开发）业务server也可以通过alowcode请求携带的header信息来做验证；proxy也会把alowcode这边的用户及权限、角色携带过去，业务server可以校验使用
1. 所有请求经过了proxy，可以做统一的操作日志记录，实现管理审计功能

### 如何使用

#### 1、安装依赖
```
npm i 
```

#### 2、创建mysql数据库

mysql数据库的配置信息在 `server/conf/dev.js` 里面
如下所示：
```
const config = {
	// 项目端口
	port: 8001,
	// 数据库配置
	db: {
		database: 'mis_db',
		username: 'root',
		password: '123456',
		host: 'localhost',
		port: 3306,
		dialect: 'mysql'
	},
	secret: 'Y4G0sAn26e' //proxy携带的秘钥
}

module.exports = config

```
修改对应的数据库配置，端口配置。线上配置为`server/conf/prod.js`


#### 3、通过sequelize 创建数据表
如下图所示，在`server/db`目录下执行 `node sync.js` 就可以创建数据表

![](https://img2020.cnblogs.com/blog/872412/202110/872412-20211029105350043-1699538103.png)

这里创建了`chart` 和 `user` 两个数据表
然后在`user`表里添加一条测试账号的数据，如下图所示

![](https://img2020.cnblogs.com/blog/872412/202110/872412-20211029105442062-193211385.png)


#### 4、启动项目
`npm run start` 启动前端项目
`npm run server` 启动server端项目
然后通过 `http://localhost:8001` 就可以访问项目了


### 声明
基于https://github.com/YalongYan/amis-react-node/tree/master/server 二次开发实现
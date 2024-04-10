const sequelize = require('./mysql')
const sysUser = require('../models/SysUser')
const sysRole = require('../models/SysRole')
const sysMenu = require('../models/SysPermission')
const Page = require('../models/Page')


// 同步所有尚未在数据库中的模型
sequelize.sync()

// 强制同步所有模型
// sequelize.sync({force: true})

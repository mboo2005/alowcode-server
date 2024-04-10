const Router = require('koa-router')
const router = new Router()
const adminController = require('../controller/admin')
const permissionCheck = require('../middlewares/permissionCheck')
const requestUser = require('../middlewares/requestUser')


router.get('/', (ctx, next) => {
    ctx.body = 'Hello World admin';
  })

router.prefix('/admin')

// 注册
router.post('/register', adminController.register())
// 登录
router.post('/login', adminController.login())

// 角色相关
router.get('/role', permissionCheck('admin'), adminController.getRole())
router.post('/role', permissionCheck('admin'), adminController.addRole())
router.delete('/role', permissionCheck('admin'), adminController.delRole())
router.post('/role/info', permissionCheck('admin'), adminController.saveRoleInfo())
router.get('/role/info', permissionCheck('admin'), adminController.getRoleInfo())

// 导航菜单
router.get('/nav', adminController.getMenu())

// 用户相关
router.get('/user', permissionCheck('admin'), adminController.getUserList())
router.post('/user', permissionCheck('admin'), adminController.addUser())
router.delete('/user', permissionCheck('admin'), adminController.delUser())
router.get('/user/info', permissionCheck('admin'), adminController.getUserInfo())
router.put('/user/info', permissionCheck('admin'), adminController.putUserInfo())

// 菜单相关(列表)
router.get('/menu', permissionCheck('admin'), adminController.getRoute())
router.post('/menu', permissionCheck('admin'), adminController.addRoute())
router.delete('/menu', permissionCheck('admin'), adminController.delRoute())
router.get('/menu/info', permissionCheck('admin'), adminController.getRouteInfo())
router.put('/menu/info', permissionCheck('admin'), adminController.putRouteInfo())

// 个人信息修改
router.put('/my/basic', requestUser(), adminController.putMyBasic())
router.post('/my/upload/head', requestUser(), adminController.uploadHead())
router.put('/my/security', requestUser(), adminController.putMySecurity())
// 路由权鉴
router.post('/route/auth', adminController.getAuth())

module.exports = router

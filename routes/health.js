const Router = require('koa-router');
const router = new Router();

router.all('/ping', (ctx, next) => {
    ctx.body = 'ok';
  })

module.exports = router
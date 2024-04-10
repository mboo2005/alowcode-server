const router = require('koa-router')();
const { addChart, updateChart, getChartListByEmail, getChartDetail, deleteChart } = require('../service/pageService');
// const { loginCheck } = require('../../middleWares/loginChecks');
const { responseOK,responseError } =require('../common/utils') ;

// node层的接口 加这个前缀
router.prefix('/admin/page');


// 获取详情
router.post('/getChartDetailById', async (ctx, next) => {
  const obj = ctx.request.body;
  const { id } = obj;
  const res = await getChartDetail(id);
  ctx.body = responseOK(res);
});

router.post('/addChart', async (ctx, next) => {
  const obj = ctx.request.body;
  const {uid} = ctx.state.user
  obj.userId = uid;
  const res = await addChart(obj);
  if (res) {
    ctx.body = responseOK(res);
  } else {
    ctx.body = responseError(400,"修改失败");
  }
});

router.post('/getChartList', async (ctx, next) => {
  const obj = ctx.request.body;
  const { email } = obj;
  const res = await getChartListByEmail(email);
  ctx.body = responseOK(res);
});

router.post('/deleteChart', async (ctx, next) => {
  const obj = ctx.request.body;
  const { id } = obj;
  const res = await deleteChart(id);
  if (res) {
    ctx.body = responseOK(res);
  } else {
    ctx.body = responseError(400,"修改失败");
  }
});

router.post('/updateChart', async (ctx, next) => {
  const obj = ctx.request.body;
  const res = await updateChart(obj);
  if (res) {
    ctx.body = responseOK(res);
  } else {
    ctx.body = responseError(400,"修改失败");
  }
});

module.exports = router;

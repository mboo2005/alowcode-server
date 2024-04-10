const Pages = require('../models/Page');
const { removeEmptyKeys } = require('../common/utils');

// 获取列表
async function getChartListByEmail(v) {
  const result = await Pages.findAll({
    
    order: ['id'],
  });
  return result.reverse();
}

// 添加
async function addChart(obj) {
  const result = await Pages.create(obj);
  const data = result.dataValues;
  return data;
}

// 修改
async function updateChart(obj) {
  const { id } = obj;
  const updateData = removeEmptyKeys(obj);
  delete updateData.id;
  const result = await Pages.update(updateData, {
    where: {
      id,
    },
  });
  return result[0] > 0; // 修改的行数
}

// 获取详情
async function getChartDetail(v) {
  const result = await Pages.findOne({
    where: {
      id: v,
    },
  });
  return result;
}

// 删除
async function deleteChart(id) {
  const result = await Pages.destroy({
    where: {
      id,
    },
  });
  // result 删除的行数
  return result > 0;
}

module.exports = {
  addChart,
  updateChart,
  getChartListByEmail,
  getChartDetail,
  deleteChart,
};

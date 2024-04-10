const seq = require('../lib/mysql')
const Sequelize = require('sequelize');
/**
 * page表, 存放page信息
 * 用户用现在的邮箱 就不用创建表了
 * email // 邮箱
 * userName // 用户名
 * title // 卡片标题
 * pageData // 存的 JSON.stringify() 之后的对象字符串
 * pageStatus // 1是仅保存， 2是发布  发布状态才可以访问
 */

const Pages = seq.define('page', {
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pageData: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  pageStatus: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    defaultValue: 0
  },
  permission: {
    type: Sequelize.STRING(1024),
    allowNull: true,
    defaultValue: ""
  },
});

module.exports = Pages;

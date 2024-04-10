const sequelize = require('../lib/mysql')
const Sequelize = sequelize.Sequelize

const SysPerm = sequelize.define('sys_permission', {
	id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	parent: {
		type: Sequelize.INTEGER(11),
		allowNull: false
	},
	name: {
		type: Sequelize.STRING(255),
		allowNull: false,
		defaultValue: ""
	},
	description: {
		type: Sequelize.STRING(255),
	},
	type: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		defaultValue: 0
	},
	icon: {
		type: Sequelize.STRING(100),
	},
	orderNum: {
		type: Sequelize.INTEGER(11),
	}
}, {freezeTableName: true, timestamps: false})

module.exports = SysPerm

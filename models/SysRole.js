const sequelize = require('../lib/mysql')
const Sequelize = sequelize.Sequelize
const sysPerm = require('./SysPermission')

const SysRole = sequelize.define('sys_role', {
	id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	roleName: {
		type: Sequelize.STRING(50),
		allowNull: false
	},
	remark: {
		type: Sequelize.STRING(255),
	},
	createUserId: {
		type: Sequelize.INTEGER(11),
	}
}, {freezeTableName: true, timestamps: false})

SysRole.belongsToMany(sysPerm, {through: 'sys_role_perm', foreignKey: 'roleId', timestamps: false})
sysPerm.belongsToMany(SysRole, {through: 'sys_role_perm', foreignKey: 'permId', timestamps: false})

module.exports = SysRole

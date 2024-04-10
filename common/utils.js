const crypto = require('crypto')
const fs = require('fs')

/**
 * 生成当前时间时间戳
 * @return {number}
 */
exports.getTimstamp = () => {
	return Date.parse(new Date()) / 1000
}

/**
 * jwt secret生成
 * @param username
 * @param timstamp
 * @return {string}
 */
exports.generateSecret = (username, timstamp) => {
	// 获取随机数
	const nonce = Math.floor(Math.random() * 99999)
	// 字典排序
	const arr = [username, timstamp, nonce].sort()
	// 加密
	const sha1 = crypto.createHash('sha1').update(arr.join(''))
	return sha1.digest('hex')
}

/**
 * 判断一个不重复的数组是否包含另一个
 * @param arr1
 * @param arr2
 * @return {boolean}
 * @constructor
 */
exports.isContained = (arr1, arr2) => {
	if (!(arr1 instanceof Array) || !(arr2 instanceof Array)) return false
	if (arr1.length < arr2.length) return false
	arr2.forEach(item => {
		if (!arr1.includes(item)) return false
	})
	return true
}

/**
 * 对象数组去重
 * @param objArray
 * @return {*}
 */
exports.objArrayDoWeight = (objArray) => {
	let obj = {}
	objArray = objArray.reduce((item, next) => {
		obj[next.id] ? '' : obj[next.id] = true && item.push(next)
		return item
	}, [])
	return objArray
}

/**
 * 菜单排序
 * @param menus
 */
exports.menusOrder = (menus) => {
	menus.sort((obj1, obj2) => {
		orderNum1 = obj1.orderNum
		orderNum2 = obj2.orderNum
		if (orderNum1 < orderNum2) {
			return -1
		} else if (orderNum1 > orderNum2) {
			return 1
		} else {
			return 0
		}
	})
	return menus
}

/**
 *
 * @param folderpath
 */
exports.checkDirExist = (folderpath) => {
	const pathArr = folderpath.split('/');
	let _path = '';
	for (let i = 0; i < pathArr.length; i++) {
		if (pathArr[i]) {
			_path += `/${pathArr[i]}`;
			if (!fs.existsSync(_path)) {
				fs.mkdirSync(_path);
			}
		}
	}
}

// 去除 obj中 value 值为空的 key
exports.removeEmptyKeys = (obj) => {
	let newObj = {};
	Object.keys(obj).forEach((key) => {
	  if (obj[key] !== '' && obj[key] !== null) {
		newObj[key] = obj[key];
	  }
	});
	return newObj;
  };
  
  // 把日期格式转为年-月-日
  exports.getFormedTime = (d) => {
	let year = d.getFullYear();
	let day = d.getDate();
	let month = d.getMonth() + 1;
	day = day < 10 ? '0' + day : day;
	month = month < 10 ? '0' + month : month;
	return `${year}-${month}-${day}`;
  };
  

  exports.responseOK = (d)=>{
	return {
		status:200,
		msg:"success",
		data:d
	}
  }

  exports.responseError = (code,msg="err")=>{
	if (!code) {
		code = 400
	}
	return {
		status:code,
		msg:msg
	}
  }
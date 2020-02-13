

// const model = require('../model')
// const m  = model([
//   'list',
//   'add',
//   'update',
//   'del',
//   'login',
// ], 'user')
// module.exports = {
//   ...m,
// }


const pojo = require('../../helper/pojo');
const { success, failed } = pojo;
const userController = require("../../controller/prvUser/index.js");

const { 
	formatDataTime,
	otherLast
}  = require("../../utils/tools.js");


exports.login = async ctx => {

	let res;
      try {
        const val = ctx.request.body;
        await userController.login(val).then(result => {
			

          // 判断是否登录接口  存储用户信息到session
          let userInfo = result[0] || {};
          ctx.session[userInfo.pk] = userInfo;

          res = success(userInfo);
		});
      } catch(err) {
        res = failed(err)
      }
      ctx.body = res
};



exports.userList = async ctx => { // 获取用户列表

	let res;
	try{

		const val = ctx.request.body;
		await userController.userList(val).then(result => {

			let userList = result || [];

			formatDataTime(userList,"create_time");
			res = success(userList);
		})

	}catch(err){
		res = failed(err);
	};

	ctx.body = res;
}

exports.loginRecordAddItem = async ctx => { // 新增登录记录

	let res;
	try{

		const val = ctx.request.body;
		await userController.loginRecordAddItem(val).then(result => {

			res = success(result);

		})

	}catch(err){
		res = failed(err);
	};

	ctx.body = res;
}



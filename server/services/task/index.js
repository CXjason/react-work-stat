





const pojo = require('../../helper/pojo');
const { success, failed } = pojo;
const taskController = require("../../controller/task/index.js");
const { 
	formatDataTime,
	otherLast
}  = require("../../utils/tools.js");


exports.departmentList = async ctx => { // 获取部门列表
	let res;
      try {

        await taskController.departmentList().then(result => {
		

          res = success(result);
		});
      } catch(err) {
        res = failed(err)
      }
      ctx.body = res
};


exports.ranksList = async ctx => { // 获取 职位列表

	let res;

	try{
		await taskController.ranksList().then(result => {
			res = success(result);
		})
	}catch(err){

		res = failed(err);
	};

	ctx.body = res;
};

exports.taskList = async ctx => { // 获取 任务列表

	let res;

	try{

		let val = ctx.request.body;

		// 获取列表数据
		let taskListData = await taskController.taskList(val);

		formatDataTime(taskListData,"create_time");
		formatDataTime(taskListData,"estimate_time");
		formatDataTime(taskListData,"finish_time");
		formatDataTime(taskListData,"examine_time");


		res = success(taskListData);

		let total = await taskController.taskListTotal(val)

		res["total"] = total[0]["total"];

		// await taskController.taskList(val).then(result => {

		// 	formatDataTime(result,"create_time");
		// 	formatDataTime(result,"estimate_time");
		// 	formatDataTime(result,"finish_time");
		// 	formatDataTime(result,"examine_time");

		// 	res = success(result);
		// });


	}catch(err){

		res = failed(err);
	};

	ctx.body = res;
};

exports.addTaskItem = async ctx => {

	let res;

	try{

		let val = ctx.request.body;
		await taskController.addTaskItem(val).then(result => {

			res = success(result);
		})
	}catch(err){

		res = failed(err);
	};

	ctx.body = res;
};


exports.updateTaskItem = async ctx => {

	let res;

	try{

		let val = ctx.request.body;

		await taskController.updateTaskItem(val).then(result => {

			res = success(result);

		});


	}catch(err){

		res = failed(err);
	};

	ctx.body = res;
};


exports.removeTaskItem = async ctx => {

	let res;

	try{

		let val = ctx.request.body;

		await taskController.removeTaskItem(val).then(result => {

			res = success(result);

		});
	}catch(err){

		res = failed(err);
	};


	ctx.body = res;
}

exports.authorityList = async ctx => {

	let res;

	try{

		await taskController.authorityList().then(result => {

			res = success(result);
		});


	}catch(err){
		res = failed(err);
	}

	ctx.body = res;
}



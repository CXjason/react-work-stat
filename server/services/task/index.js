





const pojo = require('../../helper/pojo');
const { success, failed } = pojo;
const taskController = require("../../controller/task/index.js");
const { 
	formatDataTime
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


exports.projectList = async ctx => { // 获取项目列表

	let res;
	try{

		await taskController.projectList().then(result => {

			res = success(result);
		});

	}catch(err){

		res = failed(err);
	};

	ctx.body = res;
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


		await taskController.taskList(val).then(result => {

			formatDataTime(result,"create_time");
			formatDataTime(result,"estimate_time");
			formatDataTime(result,"finish_time");


			res = success(result);
		})
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



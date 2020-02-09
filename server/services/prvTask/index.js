





const pojo = require('../../helper/pojo');
const { success, failed } = pojo;
const taskController = require("../../controller/prvTask/index.js");
const { 
	formatDataTime,
	otherLast,
	decryptArrData
}  = require("../../utils/tools.js");




exports.taskList = async ctx => { // 获取 任务列表

	let res;

	try{

		let val = ctx.request.body;


		await taskController.taskList(val).then(result => {

			formatDataTime(result,"create_time");
			formatDataTime(result,"start_time","YYYY-MM-DD");
			formatDataTime(result,"end_time","YYYY-MM-DD");
			formatDataTime(result,"last_punch_time","YYYY-MM-DD");

			decryptArrData(result);

			res = success(result);
		});


	}catch(err){

		res = failed(err);
	};

	ctx.body = res;
};

exports.addTaskItem = async ctx => { // 添加任务 

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





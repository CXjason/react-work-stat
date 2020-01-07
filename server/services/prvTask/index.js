





const pojo = require('../../helper/pojo');
const { success, failed } = pojo;
const taskController = require("../../controller/prvTask/index.js");
const { 
	formatDataTime,
	otherLast
}  = require("../../utils/tools.js");




exports.taskList = async ctx => { // 获取 任务列表

	let res;

	try{

		let val = ctx.request.body;


		await taskController.taskList(val).then(result => {

			formatDataTime(result,"create_time");
			formatDataTime(result,"start_time");
			formatDataTime(result,"end_time");

			res = success(result);
		})
	}catch(err){

		res = failed(err);
	};

	ctx.body = res;
};










const moment = require("moment");
const pojo = require('../../helper/pojo');
const { success, failed } = pojo;
const taskController = require("../../controller/punchCard/index.js");
const prvTaskController = require("../../controller/prvTask/index.js");
const { 
	formatDataTime,
	otherLast
}  = require("../../utils/tools.js");


exports.punchList = async ctx => { // 获取 打卡记录列表

	let res;

	try{

		let val = ctx.request.body;


		await taskController.punchList(val).then(result => {

			formatDataTime(result,"create_time");


			res = success(result);
		});


	}catch(err){

		res = failed(err);
	};

	ctx.body = res;
};



exports.addPunchCard = async ctx => {

	let res;

	try{

		let val = ctx.request.body;

		let result = await taskController.addPunchCard(val);

		// 更新任务中的打卡时间
		let params = {
			pk:val.prv_task_pk,
			last_punch_time:moment().format("YYYY-MM-DD HH:mm:ss")
		};
		await prvTaskController.updateTaskItem(params);

		res = success(result);


	}catch(err){

		res = failed(err);
	};

	ctx.body = res;
};
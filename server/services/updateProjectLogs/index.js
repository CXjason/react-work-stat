





const pojo = require('../../helper/pojo');
const { success, failed } = pojo;
const updateProjectLogsController = require("../../controller/updateProjectLogs/index.js");
const { 
	formatDataTime,
	otherLast
}  = require("../../utils/tools.js");




exports.updateProjectLogsList = async ctx => { // 获取 任务列表

	let res;

	try{

		let val = ctx.request.body;

		// 获取列表数据
		let taskListData = await updateProjectLogsController.updateProjectLogsList(val);

		formatDataTime(taskListData,"update_time");


		res = success(taskListData);

	}catch(err){

		res = failed(err);
	};

	ctx.body = res;
};




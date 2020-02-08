





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

		let total = await updateProjectLogsController.updateProjectLogsListTotal(val)

		res["total"] = total[0]["total"];

	}catch(err){

		res = failed(err);
	};

	ctx.body = res;
};

// 修改
exports.updateProjectLogsItem = async ctx => {

	let res;

	try{

		let val = ctx.request.body;

		await updateProjectLogsController.updateProjectLogsItem(val).then(result => {

			res = success(result);

		});

	}catch(err){

		res = failed(err);
	}

	ctx.body = res;
}

// 新增
exports.addUpdateProjectLogsItem = async ctx => {

	let res;

	try{

		let val = ctx.request.body;
		await updateProjectLogsController.addUpdateProjectLogsItem(val).then(result => {

			res = success(result);
		})
	}catch(err){

		res = failed(err);
	};

	ctx.body = res;
};


// 删除
exports.remoteUpdateProjectLogsItem = async ctx => {

	let res;

	try{

		let val = ctx.request.body;

		await updateProjectLogsController.remoteUpdateProjectLogsItem(val).then(result => {

			res = success(result);

		});
	}catch(err){

		res = failed(err);
	};


	ctx.body = res;
}



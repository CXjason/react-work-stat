




const pojo = require('../../helper/pojo');
const { success, failed } = pojo;
const affairRecordController = require("../../controller/affairRecord/index.js");

const { 
	formatDataTime,
	otherLast
}  = require("../../utils/tools.js");

exports.list = async ctx => { // 获取项目列表

	let res;
	try{

		let val = ctx.request.body;

		// 获取列表数据
		let taskListData = await affairRecordController.list(val);

		formatDataTime(taskListData,"create_time");

		res = success(taskListData);

		let total = await affairRecordController.taskListTotal(val)

		res["total"] = total[0]["total"];

	}catch(err){

		res = failed(err);
	};

	ctx.body = res;
};

exports.recordTypeList = async ctx => { // 获取项目列表

	let res;
	try{

		await affairRecordController.recordTypeList().then(result => {

			formatDataTime(result,"create_time");

			res = success(result);
		});

	}catch(err){

		res = failed(err);
	};

	ctx.body = res;
};

// 添加一条记录
exports.addRecordItem = async ctx => {

	let res;

	try{

		let val = ctx.request.body;
		await affairRecordController.addRecordItem(val).then(result => {

			res = success(result);
		})
	}catch(err){

		res = failed(err);
	};

	ctx.body = res;
};


exports.removeRecordItem = async ctx => {


	let res;

	try{

		let val = ctx.request.body;

		await affairRecordController.removeRecordItem(val).then(result => {

			res = success(result);

		});
	}catch(err){

		res = failed(err);
	};


	ctx.body = res;

}

exports.updateRecordItem = async ctx => {

	let res;

	try{

		let val = ctx.request.body;

		await affairRecordController.updateRecordItem(val).then(result => {

			res = success(result);

		});


	}catch(err){

		res = failed(err);
	};

	ctx.body = res;
};








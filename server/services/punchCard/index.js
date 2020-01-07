





const pojo = require('../../helper/pojo');
const { success, failed } = pojo;
const taskController = require("../../controller/punchCard/index.js");
const { 
	formatDataTime,
	otherLast
}  = require("../../utils/tools.js");



exports.addPunchCard = async ctx => {

	let res;

	try{

		let val = ctx.request.body;
		await taskController.addPunchCard(val).then(result => {

			res = success(result);
		})
	}catch(err){

		res = failed(err);
	};

	ctx.body = res;
};
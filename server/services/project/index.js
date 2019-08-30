




const pojo = require('../../helper/pojo');
const { success, failed } = pojo;
const projectController = require("../../controller/project/index.js");
const { 
	formatDataTime,
	otherLast
}  = require("../../utils/tools.js");

exports.projectList = async ctx => { // 获取项目列表

	let res;
	try{

		await projectController.projectList().then(result => {

			otherLast(result,"name","其他");

			res = success(result);
		});

	}catch(err){

		res = failed(err);
	};

	ctx.body = res;
};


exports.addProject = async ctx => { // 添加项目

	let res;
	try{

		let val = ctx.request.body;
		await projectController.addProject(val).then(result => {

			res = success(result);
		})

	}catch(err){

		res = failed(err);
	};

	ctx.body = res;
};


exports.updateProject = async ctx => { // 修改项目


	let res;
	try{

		let val = ctx.request.body;

		await projectController.updateProject(val).then(result =>{

			console.log(result)

			res = success(result);
		})

	}catch(err){

		res = failed(err);
	};

	ctx.body = res;
};







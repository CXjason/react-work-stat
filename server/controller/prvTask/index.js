


const pool = require('../../lib/mysql')
const { NtNUpdate } = require('../../helper')
const { query } = pool
const TYPES = require('../../enum');

const moment = require("moment");

const crytoFn = require("../../utils/cryptoTool.js");



// 获取任务列表
const taskList = val => {

	let where = "";

	for(let item in val){

		where += item + "=" + val[item] + " and ";

	};


	// 条件
	if(where != ""){
		// 去掉最后一个逗号
		where = where.slice(0,-5);
		where = "WHERE " + where;
	};


	const sql = "SELECT * FROM prv_task " + where + " ORDER BY create_time DESC";

	return query(sql);
};

const addTaskItem = val => {

	let start_time = val.start_time || "";
	let end_time = val.end_time || "";
	let task_content = val.task_content || "";
	let create_time = moment().format("YYYY-MM-DD HH:mm:ss");
	let status = 1;
	let create_person_name = val.create_person_name || "";
	let create_person_pk = val.create_person_pk || "";

	if(task_content){
		task_content = crytoFn.getEncAse192(task_content,crytoFn.crytoKey);
	};

	let sql = `INSERT INTO prv_task(
				start_time,
				end_time,
				task_content,
				create_time,
				status,
				create_person_name,
				create_person_pk
			) VALUES (?,?,?,?,?,?,?)`;

	let sqlParams = [
					start_time,
					end_time,
					task_content,
					create_time,
					status,
					create_person_name,
					create_person_pk
				];

	return query(sql,sqlParams);
};

const updateTaskItem = val => { // 修改一条任务
 
	let start_time = val.start_time || "";
	let end_time = val.end_time || "";
	let task_content = val.task_content || "";
	let status = val.status || "";
	let create_person_name = val.create_person_name || "";
	let create_person_pk = val.create_person_pk || "";
	let last_punch_time = val.last_punch_time || "";

	if(task_content){
		task_content = crytoFn.getEncAse192(task_content,crytoFn.crytoKey);
	};

	let keyArr = {
		start_time,
		end_time,
		task_content,
		status,
		create_person_name,
		create_person_pk,
		last_punch_time,
	};

	

	let sqlParams = [];

	let updateStr = "";


	for(let item in keyArr){

		for(let key in val){

			if(item == key){

				updateStr += key + "=?,";
				sqlParams.push(keyArr[key]);

				break;

			}
		}
	}

	
	if(updateStr){

		updateStr = updateStr.slice(0,-1);
	}

	

	let pk = val.pk;
	sqlParams.push(pk);


	let sql = `UPDATE prv_task SET ` +updateStr+ ` WHERE pk=?`;

	// let sqlParams = [
	// 	publisher_person,
	// 	publisher_person_pk,
	// 	department_pk,
	// 	task_content,
	// 	project_name,
	// 	project_pk,
	// 	department,
	// 	estimate_time,
	// 	finish_preson,
	// 	finish_preson_pk,
	// 	pk,
	// ];


	return query(sql,sqlParams);

};



module.exports = {
  taskList,
  addTaskItem,
  updateTaskItem,
}
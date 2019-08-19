


const pool = require('../../lib/mysql')
const { NtNUpdate } = require('../../helper')
const { query } = pool
const TYPES = require('../../enum');

const moment = require("moment");


// 查询任务
const list = val => {
  const sql = 'select * from task';
  return query(sql)
};

// 获取部门列表
const departmentList = val => {
	const sql = "SELECT * FROM department";
	return query(sql);
};


// 获取项目列表
const projectList = val => {

	const sql = "SELECT * FROM project";
	return query(sql);
};

// 获取职位列表
const ranksList = val => {

	const sql = "SELECT * FROM ranks";
	return query(sql);
};

// 获取任务列表
const taskList = val => {

	let where = "";

	for(let item in val){

		where += item + "=" + val[item] + ","
	};

	// 
	if(where != ""){
		// 去掉最后一个逗号
		where = where.slice(0,-1);
		where = "WHERE " + where;
	}

	const sql = "SELECT * FROM task " + where;
	return query(sql);
};

const addTaskItem = val => {

	let publisher_person = val.publisher_person || "";
	let publisher_person_pk = val.publisher_person_pk || "";
	let department_pk = val.department_pk || "";
	let create_time = moment().format("YYYY-MM-DD HH:mm:ss");
	let task_content = val.task_content || "";
	let is_finish = 0;
	let project_name = val.project_name || "";
	let project_pk = val.project_pk || "";
	let department = val.department || "";
	let estimate_time = val.estimate_time || "";
	let finish_preson = val.finish_preson || "";
	let finish_preson_pk = val.finish_preson_pk || "";



	let sql = `INSERT INTO task(
				publisher_person,
				publisher_person_pk,
				department_pk,
				create_time,
				task_content,
				is_finish,
				project_name,
				project_pk,
				department,
				estimate_time,
				finish_preson,
				finish_preson_pk
			) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;

	let sqlParams = [
						publisher_person,
						publisher_person_pk,
						department_pk,
						create_time,
						task_content,
						is_finish,
						project_name,
						project_pk,
						department,
						estimate_time,
						finish_preson,
						finish_preson_pk,
					];

	return query(sql,sqlParams);
};


const updateTaskItem = val => { // 修改一条任务
 
	let publisher_person = val.publisher_person || "";
	let publisher_person_pk = val.publisher_person_pk || "";
	let department_pk = val.department_pk || "";
	let task_content = val.task_content || "";
	let is_finish = val.is_finish || "";
	let project_name = val.project_name || "";
	let project_pk = val.project_pk || "";
	let department = val.department || "";
	let estimate_time = val.estimate_time || "";
	let finish_time = val.finish_time || "";
	let finish_preson = val.finish_preson || "";
	let finish_preson_pk = val.finish_preson_pk || "";

	let keyArr = {
		publisher_person,
		publisher_person_pk,
		department_pk,
		task_content,
		is_finish,
		project_name,
		project_pk,
		department,
		estimate_time,
		finish_time,
		finish_preson,
		finish_preson_pk
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


	let sql = `UPDATE task SET ` +updateStr+ ` WHERE pk=?`;

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


let removeTaskItem = val => { // 删除一条任务

	let pk = val["pk"];

	let sql = "DELETE FROM task WHERE pk = " + pk;

	return query(sql);

};

module.exports = {
  list,
  departmentList,
  projectList,
  ranksList,
  taskList,
  addTaskItem,
  updateTaskItem,
  removeTaskItem,
}
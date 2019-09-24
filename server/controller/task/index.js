


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

// 获取职位列表
const ranksList = val => {

	const sql = "SELECT * FROM ranks";
	return query(sql);
};

// 获取任务列表
const taskList = val => {

	let where = "";



	for(let item in val){

		if(
			item != "create_start" && 
			item != "create_end" && 
			item != "estimate_start" && 
			item != "estimate_end" && 
			item != "finishTime_start" && 
			item != "finishTime_end" &&
			item != "searchVal"
		){

			where += item + "=" + val[item] + " and ";
		}
	};



	// 条件
	if(where != ""){
		// 去掉最后一个逗号
		where = where.slice(0,-5);
		where = "WHERE " + where;
	};

	// 搜索内容
	let searchVal = val["searchVal"] || "";
	if(searchVal){
		where += " AND (task_content LIKE '%"+searchVal+"%')";
	};

	// 新建时间
	if(val["create_start"] && val["create_end"]){

		where += " and create_time between '" + val["create_start"] + "' and '" + val["create_end"] + "'";
	};
	

	// 预计完成时间范围搜索
	if(val["estimate_start"] && val["estimate_end"]){

		where += " and estimate_time between '" + val["estimate_start"] + "' and '" + val["estimate_end"] + "'";
	};

	// 完成时间范围搜索
	if(val["finishTime_start"] && val["finishTime_end"]){

		where += " and finish_time between '" + val["finishTime_start"] + "' and '" + val["finishTime_end"] + "'";
	};

	const sql = "SELECT * FROM task " + where + " ORDER BY create_time DESC";

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
	let urgent_status = val.urgent_status || "";



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
				finish_preson_pk,
				urgent_status
			) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;

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
						urgent_status
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
	let estimate_time = val.estimate_time || null;
	let finish_time = val.finish_time || null;
	let finish_leav_msg = val.finish_leav_msg || "";
	let examine_time = val.examine_time || null;
	let examine_leav_msg = val.examine_leav_msg || "";
	let finish_preson = val.finish_preson || "";
	let finish_preson_pk = val.finish_preson_pk || "";
	let urgent_status = val.urgent_status || "";

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
		finish_leav_msg,
		examine_time,
		examine_leav_msg,
		finish_preson,
		finish_preson_pk,
		urgent_status
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

let updateProjectName = val => { // 修改项目名称


	let project_name = val["project_name"];
	let project_pk = val["project_pk"];

	let sql = "UPDATE task SET project_name=? WHERE project_pk=?";
	let sqpParams = [project_name,project_pk];

	return query(sql,sqpParams);
};


let removeTaskItem = val => { // 删除一条任务

	let pk = val["pk"];

	let sql = "DELETE FROM task WHERE pk = " + pk;

	return query(sql);

};


let authorityList = val => {

	let sql = "SELECT * FROM authority";

	return query(sql)
};

module.exports = {
  list,
  departmentList,
  ranksList,
  taskList,
  addTaskItem,
  updateTaskItem,
  updateProjectName,
  removeTaskItem,
  authorityList,
}
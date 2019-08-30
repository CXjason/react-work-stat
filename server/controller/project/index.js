
const pool = require('../../lib/mysql')
const { NtNUpdate } = require('../../helper')
const { query } = pool
const TYPES = require('../../enum');

const moment = require("moment");


// 获取项目列表
const projectList = val => {

	const sql = "SELECT * FROM project WHERE status=1";
	return query(sql);
};

// 添加任务
const addProject = val => {

	let add_person_name = val["add_person_name"] || "";
	let add_person_pk = val["add_person_pk"] || "";
	let department_name = val["department_name"] || "";
	let department_pk = val["department_pk"] || "";
	let name = val["name"] || "";
	let create_time = moment().format("YYYY-MM-DD HH:mm:ss");
	let status = 1;

	let sql = `INSERT INTO project(
					add_person_name,
					add_person_pk,
					department_name,
					department_pk,
					name,
					create_time,
					status
				) VALUES(?,?,?,?,?,?,?)`;

	let sql_params = [
						add_person_name,
						add_person_pk,
						department_name,
						department_pk,
						name,
						create_time,
						status
					];

	return query(sql,sql_params);
};

const updateProject = val => { // 修改项目


	let add_person_name = val["add_person_name"] || "";
	let add_person_pk = val["add_person_pk"] || "";
	let department_name = val["department_name"] || "";
	let department_pk = val["department_pk"] || "";
	let name = val["name"] || "";
	let create_time = val["create_time"] || "";
	let status = val["status"] || "";

	let keyArr = {
		add_person_name,
		add_person_pk,
		department_name,
		department_pk,
		name,
		create_time,
		status,
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


	let sql = `UPDATE project SET ` +updateStr+ ` WHERE pk=?`;



	return query(sql,sqlParams);

};


module.exports = {
  projectList,
  addProject,
  updateProject,
}



const pool = require('../../lib/mysql')
const { NtNUpdate } = require('../../helper')
const { query } = pool
const TYPES = require('../../enum');

const moment = require("moment");



// 获取任务列表
const punchList = val => {

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


	const sql = "SELECT * FROM punch_card " + where + " ORDER BY create_time DESC";

	return query(sql);
	
};



const addPunchCard = val => {

	let prv_task_pk = val.prv_task_pk || "";
	let finsh_person_pk = val.finsh_person_pk || "";
	let finsh_person_name = val.finsh_person_name || "";
	let create_time = moment().format("YYYY-MM-DD HH:mm:ss");




	let sql = `INSERT INTO punch_card(
				prv_task_pk,
				finsh_person_pk,
				finsh_person_name,
				create_time
			) VALUES (?,?,?,?)`;

	let sqlParams = [
						prv_task_pk,
						finsh_person_pk,
						finsh_person_name,
						create_time,

					];

	return query(sql,sqlParams);
};




module.exports = {
	punchList,
  addPunchCard,
}
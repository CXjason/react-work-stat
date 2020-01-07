


const pool = require('../../lib/mysql')
const { NtNUpdate } = require('../../helper')
const { query } = pool
const TYPES = require('../../enum');

const moment = require("moment");


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



module.exports = {
  taskList,
}
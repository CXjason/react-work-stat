


const pool = require('../../lib/mysql')
const { NtNUpdate } = require('../../helper')
const { query } = pool
const TYPES = require('../../enum');

const moment = require("moment");


// 获取任务列表
const updateProjectLogsList = val => {


	const sql = "SELECT * FROM update_project_logs";


	return query(sql);
};




module.exports = {
	updateProjectLogsList,
}
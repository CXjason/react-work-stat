


const pool = require('../../lib/mysql')
const { NtNUpdate } = require('../../helper')
const { query } = pool
const TYPES = require('../../enum');

const moment = require("moment");

// 获取列表的where
let getupdateProjectLogWhere = val => {
	let where = "";

	for(let item in val){

		if(
			item != "update_time_start" && 
			item != "update_time_end" && 
			item != "searchVal" &&
			item != "page" &&
			item != "pageSize" && 
			val[item]
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
		where += " AND (update_content LIKE '%"+searchVal+"%')";
	};

	// 更新日志时间
	if(val["update_time_start"] && val["update_time_end"]){

		where += " and update_time between '" + val["update_time_start"] + "' and '" + val["update_time_end"] + "'";
	};
	
	return where;
};


// 获取任务列表
const updateProjectLogsList = val => {

	let where = getupdateProjectLogWhere(val);

	// 计算分页
	// 每页条数默认为10条
	let limit = ""
	if(val["page"] && val["pageSize"]){

		let {page,pageSize} = val;
		//开始条数
		let startNum = (page - 1) * pageSize;
		let endNum = page * pageSize;

		limit = " limit " + startNum + "," + pageSize;

	};

	const sql = "SELECT * FROM update_project_logs " + where + " ORDER BY update_time DESC" + limit;

	return query(sql);

};

// 获取列表总条数
const updateProjectLogsListTotal = val => {

	let where = getupdateProjectLogWhere(val);

	let sql = "SELECT COUNT(*) as total FROM update_project_logs " + where;

	return query(sql)
};

const updateProjectLogsItem = val => { // 修改一条数据

 
	let update_user_name = val.update_user_name || "";
	let update_user_pk = val.update_user_pk || "";
	let version = val.version || "";
	let project_name = val.project_name || "";
	let project_pk = val.project_pk || "";
	let update_content = val.update_content || "";
	let aemreks = val.aemreks || "";


	let keyArr = {
		update_user_name,
		update_user_pk,
		version,
		project_name,
		project_pk,
		update_content,
		aemreks,
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

	let sql = `UPDATE update_project_logs SET ` +updateStr+ ` WHERE pk=?`;

	return query(sql,sqlParams);

};

// 新增
const addUpdateProjectLogsItem = val => {

	let update_user_name = val.update_user_name || "";
	let update_user_pk = val.update_user_pk || "";
	let version = val.version || "";
	let project_name = val.project_name || "";
	let project_pk = val.project_pk || "";
	let update_content = val.update_content || "";
	let aemreks = val.aemreks || "";
	let update_time = moment().format("YYYY-MM-DD HH:mm:ss");

	let sql = `INSERT INTO update_project_logs(
				update_user_name,
				update_user_pk,
				version,
				project_name,
				project_pk,
				update_content,
				aemreks,
				update_time
			) VALUES (?,?,?,?,?,?,?,?)`;

	let sqlParams = [
						update_user_name,
						update_user_pk,
						version,
						project_name,
						project_pk,
						update_content,
						aemreks,
						update_time
					];

	return query(sql,sqlParams);
};


let remoteUpdateProjectLogsItem = val => { // 删除一条

	let pk = val["pk"];

	let sql = "DELETE FROM update_project_logs WHERE pk = " + pk;

	return query(sql);

};


module.exports = {
	updateProjectLogsList,
	updateProjectLogsListTotal,
	updateProjectLogsItem,
	addUpdateProjectLogsItem,
	remoteUpdateProjectLogsItem,
}
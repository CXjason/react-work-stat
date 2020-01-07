
const pool = require('../../lib/mysql')
const { NtNUpdate } = require('../../helper')
const { query } = pool
const TYPES = require('../../enum');

const moment = require("moment");


// 获取列表
const list = val => {

	let where = "";

	for(let item in val){

		if(
			item != "searchVal" &&
			val[item] != ""
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

		if(where){
			where += " AND (content LIKE '%"+searchVal+"%')";
		}else{
			where += " WHERE (content LIKE '%"+searchVal+"%')";
		}
		
	};

	const sql = "SELECT * FROM affair_record " + where + " ORDER BY create_time DESC";
	return query(sql);
};

// 获取类型列表
const recordTypeList = val => {

	const sql = "SELECT * FROM affair_type";
	return query(sql);
};

// 添加记录
const addRecordItem = val => {

	let content = val.content || "";
	let title = val.title || "";
	let type_name = val.type_name || "";
	let type_pk = val.type_pk || "";
	let create_time = moment().format("YYYY-MM-DD HH:mm:ss");
	let status = 1;



	let sql = `INSERT INTO affair_record(
				content,
				title,
				type_name,
				type_pk,
				create_time,
				status
			) VALUES (?,?,?,?,?,?)`;

	let sqlParams = [
						content,
						title,
						type_name,
						type_pk,
						create_time,
						status
					];

	return query(sql,sqlParams);
};



let removeRecordItem = val => { // 删除一条任务

	let pk = val["pk"];

	let sql = "DELETE FROM affair_record WHERE pk = " + pk;

	return query(sql);

};

const updateRecordItem = val => { // 修改一条任务
 

	let content = val.content || "";
	let type_name = val.type_name || "";
	let type_pk = val.type_pk || "";
	let title = val.title || "";


	let keyArr = {
		content,
		type_name,
		type_pk,
		title
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


	let sql = `UPDATE affair_record SET ` +updateStr+ ` WHERE pk=?`;

	return query(sql,sqlParams);

};

module.exports = {
  list,
  recordTypeList,
  addRecordItem,
  removeRecordItem,
  updateRecordItem,
}


const pool = require('../../lib/mysql')
const { NtNUpdate } = require('../../helper')
const { query } = pool
const TYPES = require('../../enum');
const moment = require("moment");



const login = val => { // 登录
  const { username,password } = val;
  const sql = "select * from prv_user where username=? and password=?";
  const sql_params = [username,password];
  return query(sql,sql_params);
};

// 获取用户列表
const userList = val => {

  const sql = "select * from prv_user where status=1";
  return query(sql);
};


// 新增登录记录
const loginRecordAddItem = val => {

	let username = val.username || "";
	let user_pk = val.user_pk || "";
	let create_time = moment().format("YYYY-MM-DD HH:mm:ss");


	let sql = `INSERT INTO login_record(
				username,
				user_pk,
				create_time
			) VALUES (?,?,?)`;

	let sqlParams = [
				username,
				user_pk,
				create_time
			];

	return query(sql,sqlParams);
};




module.exports = {
  login,
  userList,
  loginRecordAddItem,
}
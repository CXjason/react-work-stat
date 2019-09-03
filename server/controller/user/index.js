

const pool = require('../../lib/mysql')
const { NtNUpdate } = require('../../helper')
const { query } = pool
const TYPES = require('../../enum');
const moment = require("moment");

// 新添用户
const add = (val) => {
  const { username, phone, password } = val
  let _sql = 'insert into user(username,phone,password,create_time,status) values(?,?,?,now(),?);'
  return query( _sql, [ username, phone, password, creator, TYPES.normal] )
}

// 更改用户
const update = (val) => {
  const { username, phone, password, balance, lastBetTime, extraInfo, carNo, id } = val
  let _sql = 'update user set '
  const { sql, args } = NtNUpdate({ username, phone, password,last_bet_time: lastBetTime, car_no: carNo, balance, extra_info: extraInfo }, _sql)
  _sql = sql + 'where id = ?'
  return query( _sql, [...args, id] )
}

// 查询用户
const list = val => {
  const sql = 'select * from user where status = 1'
  return query(sql)
}

// 删除用户
const del = val => {
  const { id } = val
  const sql = 'update user set status = ? where id = ?'
  return query(sql, [ TYPES.deled, id ])
}

const login = val => { // 登录
  const { username,password } = val;
  const sql = "select * from user where username=? and password=?";
  const sql_params = [username,password];
  return query(sql,sql_params);
}


// 获取用户列表
const userList = val => {

  const sql = "select * from user where status=1";
  return query(sql);
};

const addUser = val => {

  let auth_key = val["auth_key"];
  let auth_pk = val["auth_pk"];
  let department_name = val["department_name"];
  let department_pk = val["department_pk"];
  let password = val["password"];
  let phone = val["phone"];
  let ranks_name = val["ranks_name"];
  let ranks_pk = val["ranks_pk"];
  let username = val["username"];
  let status = 1;
  let create_time = moment().format("YYYY-MM-DD HH:mm:ss");

  let sql = `INSERT INTO user(
              auth_key,
              auth_pk,
              department_name,
              department_pk,
              password,
              phone,
              ranks_name,
              ranks_pk,
              username,
              status,
              create_time
            ) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;

  let sql_params = [ 
              auth_key,
              auth_pk,
              department_name,
              department_pk,
              password,
              phone,
              ranks_name,
              ranks_pk,
              username,
              status,
              create_time
            ];


  return query(sql,sql_params);
}


let removeUser = val => {
  const { pk } = val;
  const sql = 'update user set status = 0 where pk = ?';
  let sql_params = [pk];
  return query(sql, sql_params);
}

module.exports = {
  add,
  list,
  update,
  del,
  login,
  userList,
  addUser,
  removeUser,
}
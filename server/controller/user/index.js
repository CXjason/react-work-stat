

const pool = require('../../lib/mysql')
const { NtNUpdate } = require('../../helper')
const { query } = pool
const TYPES = require('../../enum');

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

  const sql = "select * from user";
  return query(sql);
};

module.exports = {
  add,
  list,
  update,
  del,
  login,
  userList,
}
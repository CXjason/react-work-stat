


import axios from 'axios';
import qs from 'qs';
import * as urls from './urls.js';

// axios 配置
// axios.defaults.timeout = 30000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// //axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
// axios.defaults.baseURL = '/nlapi';
//axios.defaults.baseURL = '/';

var instance = axios.create({
  baseURL: '/apiLoca',
  //baseURL: '/',
  timeout: 30000,
});

//POST传参序列化
instance.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  };
  return config;
}, (error) => {
  console.log("错误的传参", 'fail');
  return Promise.reject(error);
});

//返回状态判断
instance.interceptors.response.use((res) => {
  if (!res.data) {
    // _.toast(res.data.msg);
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  console.log("网络异常", 'fail');
  //store.default.dispatch("setShowNotFoundPage",true);
  return Promise.reject(error);
});

export function fetch(url, params) {
  return new Promise((resolve, reject) => {

    instance.post(url, params)
      .then(response => {
        resolve(response);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
};


export default {

  /**
   *  登录
   * params:{
   *     username:'',
   *     password:'',
   * }
   * http://192.168.1.102//remotePage/other/pacs/study/editStudy?study_iuid=2015.03.22.15.15.02.0
   */
  getLogin(params){
    return fetch(urls.getLoginUrl,params);
  },

  /**
    获取任务列表
    params:{ // 字段参数
      
    }

  */
  getTaskList(params){
    return fetch(urls.getTaskListUrl,params);
  },

  /*
    获取用户列表
  */
  getUserLIst(params){
    return fetch(urls.getUserLIstUrl,params);
  },

  /*
    获取部门列表


  */
  getDepartmentList(params){
    return fetch(urls.getDepartmentListUrl,params)
  },

  /*
    获取项目列表
  */
  getProjectList(params){
  
    return fetch(urls.getProjectListUrl,params);
  },

  /*
    新增一条任务
    params:{ // 表里面需要的字段
  
    }
  */

  getAddTaskItem(params){
    return fetch(urls.getAddTaskItemUrl,params);
  },

  /*
    修改任务
    params:{ // 表里面需要的字段
  
    }
  */
  getUpdateTaskItem(params){
    return fetch(urls.getUpdateTaskItemUrl,params);
  },

  /*
    删除一条任务
    params:{
      pk:"",
    }
  */
  getRemoveTaskItem(params){

    return fetch(urls.getRemoveTaskItemUrl,params);
  },

  /*
    添加项目
  */

  getAddProject(params){
    return fetch(urls.getAddProjectUrl,params);
  },


  /*
    修改项目
  */

  getUpdateProject(params){
    return fetch(urls.getUpdateProjectUrl,params);
  },

  /*
    导出任务的xlsx表
    params = {
  
      data:"",// 任务数据
    }
  */

  getTaskExportXlsx(params){

    return fetch(urls.getTaskExportXlsxUrl,params);
  },

  /*
    获取权限列表

  */
  getAuthorityList(params){
    return fetch(urls.getAuthorityListUrl,params);
  },

  /*
    获取职位列表
  */
  getRanksList(params){
    return fetch(urls.getRanksListUrl,params)
  },

  /*
    添加用户
  */
  getAddUser(params){
    return fetch(urls.getAddUserUrl,params);
  },

  /*
    添加用户
  */
  getRemoveUser(params){
    return fetch(urls.getRemoveUserUrl,params);
  },


};

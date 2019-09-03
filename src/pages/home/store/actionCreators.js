

import $api from '../../../fetchs/apis.js';

import * as constants from './constants';
//import { fromJS } from 'immutable';

import {
	addDataKey,
	addDataNum,
} from '../../../utils/tool.js';



const changeTaskListDataAction = (result) => ({

	type:constants.CHANGE_TASK_LIST_DATA,
	taskListData:result

});


const changeUserListAction = (result) => ({
	type:constants.CHANGE_USER_LIST_DATA,
	userList:result
});

const getDepartmentListAction = (result) => ({

	type:constants.GET_DEPARTMENT_LIST_DATA,
	departmentList:result
});

const getProjectListAction = (result) => ({

	type:constants.GET_PROJECT_LIST_DATA,
	projectList:result
});

const getAuthorityListAction = (result) => ({
	type:constants.GET_AUTHORITY_LIST_DATA,
	authorityList:result
});
const getRanksListAction = (result) => ({
	type:constants.GET_RANKS_LIST_DATA,
	ranksList:result
});


export const changeTaskListData = () => { // 获取任务列表

	return (dispatch) => {

		$api.getTaskList().then(res => {

			console.log("获取任务列表");
			console.log(res);

			if(res.data.code == 0){

				let result = res.data.data;
				// 增加key属性
				addDataKey(result,"key","pk");
				// 增加序号
				addDataNum(result);
				dispatch(changeTaskListDataAction(result));
			}
		}).catch(err => {
			console.log(err);
		})
	}
}


export const changeUserList = () => { // 获取用户列表

	return (dispatch) => {

		$api.getUserLIst().then(res => {

			console.log("获取用户列表");
			console.log(res);

			if(res.data.code == 0){

				let result = res.data.data;

				addDataKey(result,"key","pk");

				dispatch(changeUserListAction(result));
			}

		}).catch(err => {

			console.log(err);
		});
	}	
}


export const getDepartmentList = () => { // 获取部门列表

	return (dispatch) => {

		$api.getDepartmentList().then(res => {

			console.log("获取科室列表");
			console.log(res);

			if(res.data.code == 0){

				let result = res.data.data;
				dispatch(getDepartmentListAction(result))
			}

		}).catch(err => {
			console.log(err);
		})
	}
}


export const getProjectList = () => { // 获取项目列表

	return (dispatch) => {

		$api.getProjectList().then(res => {

			console.log("获取项目列表");
			console.log(res);

			if(res.data.code == 0){

				let result = res.data.data;
				addDataKey(result,"key","pk");
				dispatch(getProjectListAction(result));
			}
		})
	}
}

export const getAuthorityList = () => { /// 获取权限列表

	return (dispatch) => {

		$api.getAuthorityList().then(res => {

			console.log("获取权限列表");
			console.log(res);

			if(res.data.code == 0){

				let result = res.data.data;
				addDataKey(result,"key","pk");
				dispatch(getAuthorityListAction(result));
			}
		})
	}
}


export const getRanksList = () => { // 获取职位列表

	return (dispatch) => {

		$api.getRanksList().then(res => {
			console.log("获取职位列表");
			console.log(res);

			if(res.data.code == 0){

				let result = res.data.data;
				addDataKey(result,"key","pk");
				dispatch(getRanksListAction(result));
			}
		})

	}
}














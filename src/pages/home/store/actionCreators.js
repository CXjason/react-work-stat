

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


export const changeTaskListData = () => {

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


export const changeUserList = () => {

	return (dispatch) => {

		$api.getUserLIst().then(res => {

			console.log("获取用户列表");
			console.log(res);

			if(res.data.code == 0){

				let result = res.data.data;

				dispatch(changeUserListAction(result));
			}

		}).catch(err => {

			console.log(err);
		});
	}	
}


export const getDepartmentList = () => {

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


export const getProjectList = () => {

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














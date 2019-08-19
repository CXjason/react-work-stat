



import { fromJS,List } from 'immutable';
import * as constants from './constants.js';


const defaultState = fromJS({
	taskListData:[],// 任务列表
	userList:[],//用户列表
	departmentList:[],// 部门列表
	projectList:[],// 项目列表
});

export default (state = defaultState,action) => {

	switch(action.type){
		case constants.CHANGE_TASK_LIST_DATA:
			return state.set("taskListData",List(action.taskListData))

		case constants.CHANGE_USER_LIST_DATA:
			return state.set("userList",List(action.userList))

		case constants.GET_DEPARTMENT_LIST_DATA:

			return state.set("departmentList",List(action.departmentList))

		case constants.GET_PROJECT_LIST_DATA:
			return state.set("projectList",List(action.projectList))

		default:
			return state;
	}
}













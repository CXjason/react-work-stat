



import { fromJS,List } from 'immutable';
import * as constants from './constants.js';


const defaultState = fromJS({
	taskListData:[],// 任务列表
	userList:[],//用户列表
	departmentList:[],// 部门列表
	projectList:[],// 项目列表
	authorityList:[],// 权限列表
	ranksList:[],// 职位列表
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

		case constants.GET_AUTHORITY_LIST_DATA:
			return state.set("authorityList",List(action.authorityList))

		case constants.GET_RANKS_LIST_DATA:
			return state.set("ranksList",List(action.ranksList))

		default:
			return state;
	}
}
















import { fromJS,List,Map } from 'immutable';
import * as constants from './constants.js';
import moment from 'moment';


const defaultState = fromJS({
	userPk:"", // 完成人的pk
	statCircleData:{},// 按任务完成情况统计
	onTimeTaskData:{},// 按任务是否按时完成统计 
});


export default (state = defaultState,action) => {

	switch(action.type){
		case constants.CHANGE_USER_PK:
			return state.set("userPk",action.value);
		case constants.CHANGE_TASK_LIST:
			return state.set("statCircleData",fromJS(action.data));
		case constants.CHANGE_ONTIME_TASK_LIST:
			return state.set("onTimeTaskData",fromJS(action.data));
		default:
			return state;
	}
}





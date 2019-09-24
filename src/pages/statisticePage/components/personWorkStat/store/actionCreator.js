


import $api from '../../../../../fetchs/apis.js';
import * as constants from './constants.js';


import {
	addDataKey,
	addDataNum,
} from '../../../../../utils/tool.js';



export const changeUserPk = (val) => {

	return (dispatch) => {

		dispatch({
			type:constants.CHANGE_USER_PK,
			value:val
		})
	}
} 

export const changeTaskList = (data) => {

	return (dispatch) => {

		dispatch({
			type:constants.CHANGE_TASK_LIST,
			data:data
		})
	}
}





export const changeOnTimeTaskList = (data) => {

	return (dispatch) => {

		dispatch({
			type:constants.CHANGE_ONTIME_TASK_LIST,
			data:data
		})
	}
}

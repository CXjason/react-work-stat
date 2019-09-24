


import $api from '../../../fetchs/apis.js';
import * as constants from './constants.js';


import {
	addDataKey,
	addDataNum,
} from '../../../utils/tool.js';



export const changeStatMode = (val) => {

	return (dispatch) => {

		dispatch({
			type:constants.CHANGE_STAT_MODE,
			value:val
		})
	}
}


export const changeAuditTimeRange = (val) => {

	return (dispatch) => {

		dispatch({
			type:constants.CHANGE_AUDIT_TIME_RANGE,
			value:val
		});
	}
}



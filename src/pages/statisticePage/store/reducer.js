


import { fromJS,List } from 'immutable';
import * as constants from './constants.js';
import moment from 'moment';


// 默认审核时间为今年
let auditTimeRange = [moment().startOf('year'),moment()];

const defaultState = fromJS({
	statModeData:[ // 统计模式
		{
			name:"个人工作量",
			value:1
		},
		{
			name:"ceshi",
			value:2
		},
	],
	statMode:1,
	auditTimeRange:auditTimeRange
});


export default (state = defaultState,action) => {

	switch(action.type){
		case constants.CHANGE_STAT_MODE:
			return state.set("statMode",action.value)

		case constants.CHANGE_AUDIT_TIME_RANGE:
			return state.set("auditTimeRange",List(action.value))

		default:
			return state;
	}
}





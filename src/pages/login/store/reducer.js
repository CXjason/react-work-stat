

import * as constants from './constants.js';
import { fromJS } from 'immutable';

import store from 'store';


let userInfo = store.get("react-wrok-state-userinfo") || {};
const defaultState = fromJS({
	userInfo:userInfo,  // 用户信息
});


export default (state=defaultState,action) => {

	switch(action.type){
		case constants.USER_INFO:

			store.set("react-wrok-state-userinfo",action.userInfo);
			return state.set("userInfo",action.userInfo);
		default:
			return state;
	}
}







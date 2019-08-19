
import * as constants from './constants.js';
import axios from 'axios';
import { fromJS } from 'immutable';

export const changeUserInfo = (userInfo) => ({
	type:constants.USER_INFO,
	userInfo:fromJS(userInfo)
});











import { combineReducers } from 'redux-immutable';

import { reducer as homeReducer } from '../pages/home/store';// 主页页面store
import { reducer as LoginReducer } from '../pages/login/store/';// 登录页面store
import { reducer as projectManReducer } from "../pages/projectMan//store";// 项目管理页面store
import { reducer as userMapPageReducer } from "../pages/userManPage/store";// 用户管理页面store
import { reducer as statisticePageReducer } from '../pages/statisticePage/store'; // 统计页面store
import { reducer as statPersonWorkReducer } from "../pages/statisticePage/components/personWorkStat/store";// 统计的个人工作量统计 

const reducer = combineReducers({
	home:homeReducer,
	login:LoginReducer,
	project:projectManReducer,
	userPage:userMapPageReducer,
	statPage:statisticePageReducer,
	statPersonWorkCom:statPersonWorkReducer,
});


export default reducer;












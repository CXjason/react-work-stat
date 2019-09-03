



import { combineReducers } from 'redux-immutable';

import { reducer as homeReducer } from '../pages/home/store';
import { reducer as LoginReducer } from '../pages/login/store/';
import { reducer as projectManReducer } from "../pages/projectMan//store";
import { reducer as userMapPageReducer } from "../pages/userManPage/store";

const reducer = combineReducers({
	home:homeReducer,
	login:LoginReducer,
	project:projectManReducer,
	userPage:userMapPageReducer
});


export default reducer;












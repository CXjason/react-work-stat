



import { combineReducers } from 'redux-immutable';

import { reducer as homeReducer } from '../pages/home/store';
import { reducer as LoginReducer } from '../pages/login/store/';
import { reducer as projectManReducer } from "../pages/projectMan//store";

const reducer = combineReducers({
	home:homeReducer,
	login:LoginReducer,
	project:projectManReducer
});


export default reducer;












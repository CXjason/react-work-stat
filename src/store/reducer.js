



import { combineReducers } from 'redux-immutable';

import { reducer as homeReducer } from '../pages/home/store';
import { reducer as LoginReducer } from '../pages/login/store/';

const reducer = combineReducers({
	home:homeReducer,
	login:LoginReducer
});


export default reducer;












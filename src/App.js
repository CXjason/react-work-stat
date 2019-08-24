

import React,{Component} from 'react';
import { Route,HashRouter,Redirect,Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';

import Home from './pages/home/index.js';
import Login from './pages/login/index.js';


class App extends Component{

	constructor(props){
		super(props)
	}

	componentDidMount(){

	}

	render(){
		return (
			<Provider store={store}>
		      <HashRouter>
		      	<Switch>
				  	<Route path="/home" component={Home}></Route>
			      	<Route path="/login" exact component={Login}></Route>
			      	<Redirect from='/' to='/login' />
				</Switch>_
		      </HashRouter>
		    </Provider>
		)
	}
}


export default App;



import React,{Component} from 'react';
import { Route,HashRouter,Redirect,Switch } from 'react-router-dom';

import {CacheRoute,CacheSwitch  } from 'react-router-cache-route';
import { Provider } from 'react-redux';

import store from './store';

import Home from './pages/home/index.js';
import Login from './pages/login/index.js';

import "./App.css";

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

		      	<CacheSwitch>
				  	<CacheRoute className="home-cache-route-page" path="/home" render={
				  		(props) => {
				  			let state = store.getState().toJS();
				  			if(state["login"]["userInfo"]["username"]){
				  				return (<Home {...props}/>)
				  			}else{
				  				return (<Redirect to="/login"/>)	
				  			}
				  		}
				  	}></CacheRoute>
			      	<Route path="/login" exact component={Login}></Route>
			      	<Redirect from='/' to='/login' />
				</CacheSwitch>_
		      </HashRouter>
		    </Provider>
		)
	}
}


export default App;




import React,{ PureComponent } from 'react';

import { HashRouter,Route,Switch,Redirect } from 'react-router-dom';

import {CacheRoute,CacheSwitch  } from 'react-router-cache-route';


import {
	RightContentWrapper,
} from '../style.js';


//import { connect } from 'react-redux';

import TaskList from '../../taskList/index.js';
import MyTaskList from '../../myTaskList/index.js';
import MyReleaseTaskList from '../../MyReleaseTaskList';
import ProjectManWrapper from '../../projectMan/index.js';
import UserManPage from '../../userManPage/index.js';


class RightContent extends PureComponent{

	constructor(props){
		super(props);

	}

	render(){

		return (
				<RightContentWrapper>

					<HashRouter className="">

						<CacheSwitch className="router-wrapper-switch">
							<CacheRoute path="/home/myTaskList" component={MyTaskList}></CacheRoute>
							<CacheRoute path="/home/myReleaseTaskList" component={MyReleaseTaskList}></CacheRoute>
							<CacheRoute path="/home/taskList" component={TaskList}></CacheRoute>
							<CacheRoute path="/home/projectPage" component={ProjectManWrapper}></CacheRoute>
							<CacheRoute path="/home/userManPage" component={UserManPage} className="router-wrapper-route"></CacheRoute>
							<Redirect from="/home" to="/home/taskList" />
						</CacheSwitch> 
						
					</HashRouter>

				</RightContentWrapper>
			)
	}
}



export default RightContent;


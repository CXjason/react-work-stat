


import React,{ PureComponent } from 'react';

import { HashRouter,Route,Switch,Redirect } from 'react-router-dom';

import {
	RightContentWrapper,
} from '../style.js';


//import { connect } from 'react-redux';

import TaskList from '../../taskList/index.js';
import MyTaskList from '../../myTaskList/index.js';
import MyReleaseTaskList from '../../MyReleaseTaskList';


class RightContent extends PureComponent{

	constructor(props){
		super(props);

	}

	render(){

		return (
				<RightContentWrapper>

					<HashRouter>

						<Switch>
							<Route path="/home/myTaskList" component={MyTaskList}></Route>
							<Route path="/home/myReleaseTaskList" component={MyReleaseTaskList}></Route>
							<Route path="/home/taskList" component={TaskList}></Route>
							<Redirect from="/home" to="/home/taskList" />
						</Switch> 
						
					</HashRouter>

				</RightContentWrapper>
			)
	}
}



export default RightContent;


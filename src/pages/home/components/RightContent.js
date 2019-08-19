


import React,{ PureComponent } from 'react';

import { HashRouter,Route,Switch,Redirect } from 'react-router-dom';

import {
	RightContentWrapper,
} from '../style.js';


//import { connect } from 'react-redux';

import TaskList from '../../taskList/index.js';


class RightContent extends PureComponent{

	// constructor(props){
	// 	super(props);

	// }

	render(){
		return (
				<RightContentWrapper>

					<HashRouter>

						<Switch>
							<Route path="/home/taskList" exact component={TaskList}></Route>
							<Redirect from="/home" to="/home/taskList" />
						</Switch> 
						
					</HashRouter>

				</RightContentWrapper>
			)
	}
}



export default RightContent;





import React,{ PureComponent } from 'react';

import { HashRouter,Route } from 'react-router-dom';

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
						<Route path="/home/taskList" exact component={TaskList}></Route>
					</HashRouter>

				</RightContentWrapper>
			)
	}
}



export default RightContent;


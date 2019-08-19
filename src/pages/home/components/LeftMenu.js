




import React,{ PureComponent } from 'react';

import {
	LeftMenuWrapper,
	LeftMenuTop,
	LeftMenuBottom,
} from '../style.js';


//import { connect } from 'react-redux';



class LeftMenu extends PureComponent{

	constructor(props){
		super(props);

		this.toTaskListPage = this.toTaskListPage.bind(this);
	}

	toTaskListPage(){ // 跳转到任务列表页面

		//console.log(this.props.history);

		this.props.history.push("/home/taskList");
	}

	render(){
		return (


				<LeftMenuWrapper>

					<LeftMenuTop>
						<div className="logo-wrapper">
							logo
						</div>
						<ul className="list">
							<li className="list-item" onClick={this.toTaskListPage}>
								<span>任务列表</span>
							</li>
							<li className="list-item">
								<span>我的任务</span>
							</li>
						</ul>

					</LeftMenuTop>

					<LeftMenuBottom>

					</LeftMenuBottom>


				</LeftMenuWrapper>
			)
	}

}


export default LeftMenu;
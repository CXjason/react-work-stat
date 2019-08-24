




import React,{ PureComponent } from 'react';

import {
	LeftMenuWrapper,
	LeftMenuTop,
	LeftMenuBottom,
} from '../style.js';


import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';



class LeftMenu extends PureComponent{

	constructor(props){
		super(props);

		this.toTaskListPage = this.toTaskListPage.bind(this);
	}

	toTaskListPage(){ // 跳转到任务列表页面

		//console.log(this.props.history);

		this.props.history.push("/home/taskList");
	}

	toMyTaskListPage = () => { // 跳转到我的任务列表页面

		this.props.history.push("/home/myTaskList");
	}

	toReleaseTaskListPage = () => { // 跳转到我发布的任务列表页面

		this.props.history.push("/home/myReleaseTaskList");
	}

	render(){

		let { userInfo } = this.props;
		userInfo = userInfo.toJS();


		return (


				<LeftMenuWrapper>

					<LeftMenuTop>
						<div className="logo-wrapper">
							logo
						</div>
						<ul className="list">
							<NavLink className="list-item" to="/home/taskList" activeClassName="selected">
								<span>任务列表</span>
							</NavLink>
							{
								userInfo.auth_pk != 3 ? (
									<NavLink className="list-item" to="/home/myReleaseTaskList" activeClassName="selected">
										<span>我的发布</span>
									</NavLink>
								) : ""

							}
							
							<NavLink className="list-item" to="/home/myTaskList" activeClassName="selected">
								<span>我的任务</span>
							</NavLink>
						</ul>

					</LeftMenuTop>

					<LeftMenuBottom>

					</LeftMenuBottom>


				</LeftMenuWrapper>
			)
	}

}


const mapState = (state) => ({

	userInfo:state.getIn(['login','userInfo'])
})


export default connect(mapState,null)(LeftMenu);
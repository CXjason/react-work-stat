



import React,{ PureComponent } from 'react';
import { connect } from 'react-redux';
//import { Button } from 'antd';

import TopInofColumnCom from './components/topInfoColumn.js';
import LeftMenuCom from './components/LeftMenu.js';
import RightContentCom from './components/RightContent.js';

import { actionCreators } from './store';


import { 
	HomeWrapper,
} from './style.js';

class Home extends PureComponent{

	constructor(props){
		super(props);
	}

	componentDidMount(){

		this.props.changeTaskListData();

		this.props.changeUserList();

		this.props.getDepartmentList();

		this.props.getProjectList();

		this.props.getAuthorityList();
		
		this.props.getRanksList();
	}

	render(){
		return (
				<HomeWrapper>

					<LeftMenuCom
						history={this.props.history}
					></LeftMenuCom>


					<div className="bot-info-wrapper">

						<TopInofColumnCom></TopInofColumnCom>

						<RightContentCom></RightContentCom>

					</div>
					
					
				</HomeWrapper>
			)
	}
}


const mapState = (state) => ({

});

const mapDispatch = (dispatch) => ({
	
	changeTaskListData(){  // 获取任务列表

		const action = actionCreators.changeTaskListData();
		dispatch(action);
	},
	changeUserList(){  // 获取用户列表

		const action = actionCreators.changeUserList();

		dispatch(action);
	},
	getDepartmentList(){ // 获取部门列表

		const action = actionCreators.getDepartmentList();
		dispatch(action);

	},
	getProjectList(){ // 获取项目列表
	
		const action = actionCreators.getProjectList();
		dispatch(action);
	},
	getAuthorityList(){ /// 获取权限列表
		
		const action = actionCreators.getAuthorityList();
		dispatch(action);
	},
	getRanksList(){ // 获取职位列表

		const action = actionCreators.getRanksList();
		dispatch(action);
	}	
});



export default connect(mapState,mapDispatch)(Home);














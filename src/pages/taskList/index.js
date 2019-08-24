

import React,{ PureComponent } from 'react';
import { connect } from 'react-redux';

import {
	TaskListWrapper,
} from './style.js';



import TaskListCom from '../components/taskListCom/index.js';


class TaskList extends PureComponent{

	constructor(props){
		super(props);

		let userInfo = this.props.userInfo.toJS();
		this.state = {
			
		};




	}

	componentDidMount(){


	}

	
	render(){



		return (
			<TaskListWrapper>
				<TaskListCom
					getTaskListParams={{}}
				></TaskListCom>
			</TaskListWrapper>
		)
	}
}


const mapState = (state) => ({
	taskListData:state.getIn(['home','taskListData']),
	userInfo:state.getIn(["login","userInfo"]),
	userList:state.getIn(['home',"userList"]),
	departmentList:state.getIn(['home','departmentList']),
	projectList:state.getIn(['home','projectList'])
});
	
const mapDispatch = (dispatch) => ({
	
});


export default connect(mapState,mapDispatch)(TaskList);



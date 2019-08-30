
import React,{PureComponent} from 'react';

import {
	MyTaskListWrapper
} from './style.js';


import TaskListCom from '../components/taskListCom';

import { connect } from 'react-redux';

class MyTaskList extends PureComponent{



	render(){

		let { userInfo } = this.props;
		let newUserInfo = userInfo.toJS();

		return (

			<MyTaskListWrapper>
				
				<TaskListCom
					getTaskListParams={{publisher_person_pk:newUserInfo['pk']}}
					taskPageMode="myReleaseTask"
				></TaskListCom>

			</MyTaskListWrapper>
		)
	}

	
}


const mapState = (state) => ({
	userInfo:state.getIn(['login','userInfo'])
});




export default connect(mapState,null)(MyTaskList);






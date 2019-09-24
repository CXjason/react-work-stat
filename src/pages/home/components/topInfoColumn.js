


import React,{ PureComponent } from 'react';

import {
	LayerWrapper,
} from '../style.js';

import { connect } from 'react-redux';

import store from 'store';

import {
	Modal
} from 'antd';



import { actionCreates as loginActionCreators } from '../../login/store';



console.log(loginActionCreators);


const { confirm } = Modal;


class TopInofColumn extends PureComponent{


	logout = () => { // 退出


		confirm({
        content: "该操作将会退出登录，是否继续？",
        onOk:() => {

        	store.remove("react-wrok-state-userinfo");

        	let userInfo = {};
        	this.props.changeUserInfo(userInfo)

          this.props.history.push({
						pathname:"/login"
					});
        },
      });

		
	}


	render(){


		let { userInfo } = this.props;
		let newUserInfo = userInfo.toJS();


		return (

				<LayerWrapper>

					<div className="wr-box clearfix">
						<div className="rig-wr fr">
							<span className="username rig-item">{ newUserInfo.username }</span>
							<span className="logout rig-item" onClick={this.logout}>[退出]</span>
						</div>
					</div>

				</LayerWrapper>

			)
	}
}

const mapState = (state) => ({
	userInfo:state.getIn(["login","userInfo"]),
});

const mapDispatch = dispatch => ({

	changeUserInfo(userInfo){ // 更新 用户信息
		dispatch(loginActionCreators.changeUserInfo(userInfo));
	}
})


export default connect(mapState,mapDispatch)(TopInofColumn);


























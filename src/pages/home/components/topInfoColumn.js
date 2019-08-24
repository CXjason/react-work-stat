


import React,{ PureComponent } from 'react';

import {
	LayerWrapper,
} from '../style.js';

import { connect } from 'react-redux';


class TopInofColumn extends PureComponent{




	render(){


		let { userInfo } = this.props;
		let newUserInfo = userInfo.toJS();


		return (

				<LayerWrapper>

					<div className="wr-box clearfix">
						<div className="rig-wr fr">
							<span className="username">{ newUserInfo.username }</span>
						</div>
					</div>

				</LayerWrapper>

			)
	}
}

const mapState = (state) => ({
	userInfo:state.getIn(["login","userInfo"]),
});


export default connect(mapState,null)(TopInofColumn);






























import React,{ Component,PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { 
	HomeWrapper,
	LeftMenuWrapper
} from './style.js';

class Home extends PureComponent{

	render(){
		return (
				<HomeWrapper>

					<LeftMenuWrapper></LeftMenuWrapper>
					
				</HomeWrapper>
			)
	}
}



export default Home;














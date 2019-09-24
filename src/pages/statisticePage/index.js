

import React,{Component} from 'react';

import { connect } from 'react-redux';

import {
	StatisticePageWrapper,
	HeaderWrapper,
	MainContent,
} from './style.js';

import moment from 'moment';

import { actionCreators } from './store';

import PersonWorkStatCom from './components/personWorkStat';

import { 
	DatePicker,
	Select,
	Button,
} from 'antd';

const { RangePicker } = DatePicker;
const { Option } = Select;


class StatisticePage extends Component{


	searchQueryFn = () => { // 查询

		let { statMode } = this.props;

		if(statMode == 1){ // 个人工作量

			this.personWorkStatComRef.searchQueryFn();
		}

	};

	personWorkStatComRef = (ref) => { // 个人工作量赋值子组件对象
		this.personWorkStatComRef = ref;
	}


	render(){


		// props 的变量
		let {
			statModeData,
			statMode,
			auditTimeRange,
		} = this.props;
		statModeData = statModeData.toJS();
		auditTimeRange = auditTimeRange.toJS();

		// props 的函数
		let {
			changeStatMode,
			changeAuditTimeRange,
		} = this.props;


		return(
			<StatisticePageWrapper className="statistice-page-wrapper">
				<HeaderWrapper className="clearfix">
					<div className="header-item">
						<span>时间范围：</span>
						<span>
							<RangePicker
								size="small"
								value={auditTimeRange}
								onChange={changeAuditTimeRange}
						    />
					    </span>
					</div>
					<div className="header-item">
						<span>模式：</span>
						<span>
							<Select
								size="small"
								style={{width:"160px"}}
								value={statMode}
								onChange={changeStatMode}
							>
								{

									statModeData.map(item => {

										let ret = <Option key={item.value} value={item.value}>{item.name}</Option>

										return ret

									})
								}
							</Select>
					    </span>
					</div>
					<div className="header-item">
						<Button type="primary" size="small" onClick={this.searchQueryFn}>查询</Button>
					</div>
				</HeaderWrapper>
				<MainContent>
					
					<PersonWorkStatCom personWorkStatComRef={this.personWorkStatComRef} {...this.props} style={statMode == 1 ? {display:'block'} : {}}></PersonWorkStatCom>
			
				</MainContent>
			</StatisticePageWrapper>
		)
	}
}


const mapState = (state) => ({
	userInfo:state.getIn(["login","userInfo"]),// 用户信息
	statModeData:state.getIn(["statPage","statModeData"]),// 统计模式数据
	statMode:state.getIn(["statPage","statMode"]),// 统计模式
	auditTimeRange:state.getIn(["statPage","auditTimeRange"]),// 审核时间范围
});


const mapDispatch = (dispatch) => ({
	changeStatMode(val){
		
		let action = actionCreators.changeStatMode(val);
		dispatch(action);
	},
	changeAuditTimeRange(val){

		let action = actionCreators.changeAuditTimeRange(val)
		dispatch(action);
	}
});

export default connect(mapState,mapDispatch)(StatisticePage);





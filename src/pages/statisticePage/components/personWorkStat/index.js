

import React,{Component} from 'react';

import { connect } from 'react-redux';

import {
	PersonWorkStatComWrapper,
	HeaderWrapper,
	MainContent,
} from './style.js';

import { actionCreators } from './store';

import moment from 'moment';

import ReactEcharts from 'echarts-for-react';

import api from '../../../../fetchs/apis.js';

import {
	jsonClone,
	addDataKey,
	findArrDataVal,
	arrToJson,
	collCircularStatData,
	collCircularStatSelected,
} from '../../../../utils/tool.js';

import { 
	Select,
} from 'antd';

const { Option } = Select;



class PersonWorkStatCom extends Component{

	constructor(props){
		super(props)

		this.state = {}

		
	}

	searchQueryFn = () => { // 开始查询

		this.fetchTaskList();

		
	};

	fetchTaskList = () => {
		let {
			userPk,
			auditTimeRange,
			changeTaskList,
			changeOnTimeTaskList,
		} = this.props;
		auditTimeRange = auditTimeRange.toJS();

		let params = {
			finish_preson_pk:userPk
		};

		if(auditTimeRange[0] && auditTimeRange[1]){
			params["create_start"] = moment(auditTimeRange[0]).format("YYYY-MM-DD HH:mm:ss") || "";
			params["create_end"] = moment(auditTimeRange[1]).format("YYYY-MM-DD HH:mm:ss") || "";
		};


		api.getTaskList(params).then(res => {
			console.log("获取任务列表");
			console.log(res);

			if(res.data.code == 0){

				let data = res.data.data;
				let newData = addDataKey(data,"key","pk");


				let statCircleData = this.formatTaskData(newData);
				let onTimeTaskData = this.formatOnTimeTaskData(newData);

				changeTaskList(statCircleData);
				changeOnTimeTaskList(onTimeTaskData);

				// this.setState({
				// 	taskListData:newData
				// });

			};

		}).catch(err => {

		});
	}

	formatTaskData = (data) => { // 任务状态统计格式化统计数据

		let statusData = [
			{
				status:0,
				name:"未完成"
			},
			{
				status:1,
				name:"完成中"
			},
			{
				status:2,
				name:"已完成"
			},
			{
				status:3,
				name:"已审核"
			}
		];

		let legendData = findArrDataVal(statusData,"name");
		let seriesData = collCircularStatData(data,statusData);
		let selected = collCircularStatSelected(seriesData);

		return {
			legendData,
			selected,
			seriesData
		}
	}

	formatOnTimeTaskData = (data) => { // 是否按时完成任务格式化统计数据


		let newData = jsonClone(data);


		let legendData = ["按时完成","未按时完成"];
		let seriesData = [];

		legendData.forEach(item => {

			let json = {
				name:item,
				value:0
			};

			seriesData.push(json);
		});


		for(let item of newData){


			let estimate_time = moment(item["estimate_time"]).format("x") || "";
			let finish_time = moment(item["finish_time"]).format("x") || "";
			

			if(item["is_finish"] == 2 || item["is_finish"] == 3){ // 完成的任务

				if(finish_time > estimate_time){

					seriesData[1]["value"] += 1;

				}else{
					seriesData[0]["value"] += 1;
				}
			}
		}



		let selected = collCircularStatSelected(seriesData);
		return {
			legendData,
			selected,
			seriesData
		}

	}

	componentDidMount(){

		this.props.personWorkStatComRef(this)
	}

	static getDerivedStateFromProps(nextProps,prevState){

		let userInfo = nextProps.userInfo.toJS();

		let {
			userPk,
			changeUserPk
		} = nextProps;


		if(userInfo["username"] && !userPk){

			changeUserPk(userInfo["pk"])

		}


		return null;
	}

	getFinishStatausOtion = (data) => { // 图像配置参数


		let option = {
		    title : {
		        text: '任务状态统计',
		        subtext: '',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        type: 'scroll',
		        orient: 'vertical',
		        right: 10,
		        top: 20,
		        bottom: 20,
		        data: data.legendData,

		        selected: data.selected
		    },
		    series : [
		        {
		            name: '完成状态',
		            type: 'pie',
		            radius : '55%',
		            center: ['40%', '50%'],
		            data: data.seriesData,
		            itemStyle: {
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		        }
		    ]
		};

		return option;

	}

	getIsFinishStatausOtion = (data) => { // 是否按时完成任务 统计图配置


		let option = {
		    title : {
		        text: '任务是否按时完成统计',
		        subtext: '',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        type: 'scroll',
		        orient: 'vertical',
		        right: 10,
		        top: 20,
		        bottom: 20,
		        data: data.legendData,

		        selected: data.selected
		    },
		    series : [
		        {
		            name: '按时完成',
		            type: 'pie',
		            radius : '55%',
		            center: ['40%', '50%'],
		            data: data.seriesData,
		            itemStyle: {
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		        }
		    ]
		};

		return option;

	}



	render(){


		let {
			userList,
			userPk,
			changeUserPk,
			statCircleData,
			onTimeTaskData,
		} = this.props;
		userList = userList.toJS();
		statCircleData = statCircleData.toJS();
		onTimeTaskData = onTimeTaskData.toJS();


		return(
			<PersonWorkStatComWrapper className="person-work-stat-com">
				<HeaderWrapper className="clearfix">
					<div className="header-item">
						<span>完成人：</span>
						<span>
							<Select
								size="small"
								style={{width:"160px"}}
								value={userPk}
								onChange={changeUserPk}
							>
								{

									userList.map(item => {

										let ret = <Option key={item.pk} value={item.pk}>{item.username}</Option>

										return ret

									})
								}
							</Select>
					    </span>
					</div>
				</HeaderWrapper>
				<MainContent>
					<div className="graphical-wrapper clearfix">
						<div className="graphical-item">
							<ReactEcharts
		                        option={this.getFinishStatausOtion(statCircleData)}
		                        style={{height: '350px', width: '500px'}}
		                        className='react_for_echarts' />
						</div>
						<div className="graphical-item">
							<ReactEcharts
		                        option={this.getIsFinishStatausOtion(onTimeTaskData)}
		                        style={{height: '350px', width: '500px'}}
		                        className='react_for_echarts' />
						</div>
					</div>
					
				</MainContent>
			</PersonWorkStatComWrapper>
		)
	}
}



const mapState = (state) => ({
	userList:state.getIn(["home","userList"]),
	userPk:state.getIn(["statPersonWorkCom","userPk"]),
	statCircleData:state.getIn(["statPersonWorkCom","statCircleData"]),
	onTimeTaskData:state.getIn(["statPersonWorkCom","onTimeTaskData"]),
});


const mapDispatch = (dispatch) => ({
	changeUserPk(val){

		let action = actionCreators.changeUserPk(val);
		dispatch(action);
	},
	changeTaskList(data){ // 任务状态统计

		let action = actionCreators.changeTaskList(data);
		dispatch(action)
	},
	changeOnTimeTaskList(data){ // 按时完成任务统计

		let action = actionCreators.changeOnTimeTaskList(data);
		dispatch(action);

	}
});


export default connect(mapState,mapDispatch)(PersonWorkStatCom);









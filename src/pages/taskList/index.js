

import React,{ PureComponent,Fragment } from 'react';
import { connect } from 'react-redux';

import { Table } from 'antd';

import {
	TaskListWrapper,
	HeaderNav,
	MainContent,
	ListTableAction,
} from './style.js';

//import {List,isImmutable} from 'immutable';

import {
	Button,
	Modal,
} from 'antd';

import AddTaskForm from './common/addTaskForm.js';

import { 
	findArrKeyVal,
	addDataKey
} from "../../utils/tool.js";

import moment from 'moment';

import api from '../../fetchs/apis.js';

import { actionCreators } from '../home/store';

const { confirm } = Modal;


class TaskList extends PureComponent{

	constructor(props){
		super(props);

		let userInfo = this.props.userInfo.toJS();
		this.state = {
			columns:[
			  {
			    title: '序号',
			    key: 'num',
			    fixed:"left",
			    width:80,
			    render:(text,record,index) => {

			    	return (
			    			<span key={index}>{ (index + 1) }</span>
			    		)
			    }
			  },
			  {
			    title: '发布人',
			    dataIndex: 'publisher_person',
			    key: 'publisher_person',
			    fixed:"left",
			    width:100,
			  },
			  {
			    title: '部门',
			    dataIndex: 'department',
			    key: 'department',
			    width:120,
			  },
			  {
			    title: '内容',
			    dataIndex: 'task_content',
			    key: 'task_content',
			  },
			  {
			    title: '状态',
			    dataIndex: 'is_finish',
			    key: 'is_finish',
			    width:80,
			  },
			  {
			    title: '所属项目',
			    dataIndex: 'project_name',
			    key: 'project_name',
			    width:200,
			  },
			  {
			    title: '新建时间',
			    dataIndex: 'create_time',
			    key: 'create_time',
			    width:200,
			  },
			  {
			    title: '预计完成时间',
			    dataIndex: 'estimate_time',
			    key: 'estimate_time',
			    width:200,
			  },
			  {
			    title: '完成时间',
			    dataIndex: 'finish_time',
			    key: 'finish_time',
			    width:200,
			  },
			  {
			    title: '完成人',
			    dataIndex: 'finish_preson',
			    key: 'finish_preson',
			    width:100,
			  },
			  {
			    title: 'Action',
			    key: 'action',
			    render: (text, record) => (
			      <span>
			      	{
			      		this.state.finishStatus == 0 && (userInfo.auth_key == 'admin' || record.publisher_person_pk == userInfo.pk) 
			      		? <Button style={ListTableAction} size="small" type="primary" onClick={() => this.finishTaskClick(text, record,'1')}>完成</Button> : ''
			      	}
			      	{
			      		this.state.finishStatus == 1 && userInfo.auth_key == 'admin' 
			      		? <Button style={ListTableAction} size="small" type="primary" onClick={() => this.finishTaskClick(text, record,'2')}>审核</Button> : ''
			      	}
			      	{
			      		this.state.finishStatus == 0 && (userInfo.auth_key == 'admin' || record.publisher_person_pk == userInfo.pk) 
			      		? <Button style={ListTableAction} size="small" type="primary" onClick={() => {this.editTaskClick(text, record)}}>编辑</Button> : ""
			      	}
			      	{
			      		(this.state.finishStatus == 0 && record.publisher_person_pk == userInfo.pk) || (userInfo.auth_key == 'admin') 
			      		? <Button style={ListTableAction} size="small" type="danger" onClick={() => {this.removeTaskClick(text,record)}}>删除</Button> : ""
			      	}

			      	
			      </span>
			    ),
			    fixed:"right",
			    width:220,
			  },
			],
			finishStatus:'0', // 任务完成状态
			finishList:[ // 状态数据
				{
					label:"未完成",
					value:0
				},
				{
					label:"已完成",
					value:1
				},
				{
					label:"已审核",
					value:2
				}
			],
			addTaskModal:false,// 添加任务模态框
			taskOperaModel:'',// 任务是添加(add) 还是编辑(update)
			addTaskData:this.initAddTaskData(),
			taskListData:[],// 任务列表
		};

		this.addTaskOk = this.addTaskOk.bind(this);
		this.addTaskCancel = this.addTaskCancel.bind(this);
		this.showAddModal = this.showAddModal.bind(this);


	}

	componentDidMount(){

		this.fetchTaskList();

	}

	fetchAddTaskItem = (params) => { // 新增一条任务

		api.getAddTaskItem(params).then(res => {

			console.log("新增一条任务");
			console.log(res);

			if(res.data.code == 0){
				
				this.fetchTaskList();

			};

		}).catch(err => {

		})

	}

	fetchTaskList = () => { // 获取任务列表

		let params = {
			is_finish: this.state.finishStatus
		};

		api.getTaskList(params).then(res => {
			console.log("获取任务列表");
			console.log(res);

			//taskListData

			if(res.data.code == 0){

				let data = res.data.data;
				let newData = addDataKey(data,"key","pk");

				this.setState({
					taskListData:newData
				})

			};

			

		}).catch(err => {

		});

	};

	fetchUpdateTaskItem = (params) => {

		console.log(params);

		api.getUpdateTaskItem(params).then(res => {

			console.log("修改任务");
			console.log(res);

			if(res.data.code == 0){

				this.fetchTaskList();

			}

		});

	}

	fetchRemoveTaskItem = (params) => { // 删除一条任务

		api.getRemoveTaskItem(params).then(res => {

			console.log("删除一条任务");
			console.log(res);

			if(res.data.code == 0){

				this.fetchTaskList();

			}

		});
	}



	editTaskClick = (text, record) => { // 任务编辑
		// console.log(this)
		// console.log(text)
		// console.log(record)


		record["publisher_person_pk"] = parseInt(record["publisher_person_pk"]) || "";
		record["finish_preson_pk"] = parseInt(record["finish_preson_pk"]) || "";

		this.setState({
			addTaskData:record,
			addTaskModal:true,
			taskOperaModel:"update"
		});


	}

	removeTaskClick = (text,record) => { // 删除任务


		confirm({
		    title: '提示',
		    content: '此操作将删除该条任务 ，是否继续？',
		    onOk:()=> {
			     let params = {
					pk:record.pk
				};

				this.fetchRemoveTaskItem(params);
		    },
		    onCancel() {
		    },
		  })
		
	}

	finishTaskClick = (text,record,taskStatus) => { // 完成任务 taskStatus：任务状态

		let content = "是否确认完成 " + record["publisher_person"] + " 发布的 " + record["project_name"] + " 项目的任务";

		confirm({
			title:"提示",
			content:content,
			onOk:() => {

				let params = {
					pk:record.pk,
					is_finish:taskStatus
				};

				this.fetchUpdateTaskItem(params);
			},

		})
	}

	

	switFinishStatusFn(data){ // 切换状态数据

		this.setState({
			finishStatus:data.value
		},() => {
			this.fetchTaskList();
		});

		
	}

	showAddModal(){ // 显示添加任务模态框

		this.setState({
			addTaskData:this.initAddTaskData(),
			addTaskModal:true,
			taskOperaModel:"add",
		});
	}
	addTaskFormFn = (ref) => {
		this.addTaskFormRef = ref;
	}

	addTaskOk = () => { // 添加任务 模态框确定

		
		this.addTaskFormRef.submitFn();

	}

	addTaskCancel(){ // 添加任务 模态框取消
		this.setState({
			addTaskModal:false,
		});
	}

	initAddTaskData(){ // 初始化添加任务数据
		return{
			publisher_person_pk:"",
			department_pk:"",
			finish_preson_pk:"",
			finish_time:"",
			project_pk:"",
			task_content:"",
			estimate_time:""
		}
	}

	addTaskFormSubmitUpdate = (data) => { // 增加任务提交

		
		let { departmentList , userList , projectList} = this.props;
		departmentList = departmentList.toJS();
		userList = userList.toJS();
		projectList = projectList.toJS();



		data["department"] = findArrKeyVal(departmentList,'pk',data.department_pk)["name"] || "";
		data["publisher_person"] = findArrKeyVal(userList,'pk',data.publisher_person_pk)["username"] || "";
		data["project_name"] = findArrKeyVal(projectList,'pk',data.project_pk)["name"] || "";
		data["finish_preson"] = findArrKeyVal(userList,'pk',data.finish_preson_pk)["username"] || "";
		data["estimate_time"] = moment(data["estimate_time"]).format("YYYY-MM-DD HH:mm:ss");
		data["pk"] = this.state.addTaskData["pk"];


		if(this.state.taskOperaModel == "add"){ // 增加
			this.fetchAddTaskItem(data);
		}else if(this.state.taskOperaModel == "update"){ // 编辑
			this.fetchUpdateTaskItem(data);
		};

		

		this.setState({
			addTaskModal:false,
		});

	}

	render(){

		const { userInfo } = this.props;
		const newUserInfo = userInfo.toJS();

		let { finishList, taskOperaModel, taskListData } = this.state;

		return (
			<TaskListWrapper>
				<HeaderNav className="clearfix">
					<div className="btns-wrapper fl">
						{
							finishList.map((item,index) => {

								return (
									<div className="btns-item" key={item.value}>
										<Button 
											type={this.state.finishStatus == item.value ? 'primary' : ''} 
											size="small"
											onClick={()=> this.switFinishStatusFn(item)}
										>{item.label}</Button>
									</div>
								)
							})

						}
					</div>
					{
						newUserInfo.auth_key == "admin" ? (
							<div className="btns-right fr">
								 <Button type="primary" size="small" onClick={this.showAddModal}>发布任务</Button>
							</div>
						) : ""
					}
					
				</HeaderNav>
				<MainContent>
					<Table dataSource={taskListData} columns={this.state.columns} scroll={{ x: 1900,y:1500}}/>
				</MainContent>
					
				{/* 添加任务模态框 */}
				<Modal
		          title={taskOperaModel == "add" ? "添加任务" : "编辑任务"}
		          visible={this.state.addTaskModal}
		          width="60%"
		          maskClosable={false}
		          onOk={this.addTaskOk}
		          onCancel={this.addTaskCancel}
		        >
		         	<AddTaskForm 
		         		addTaskFormFn={this.addTaskFormFn} 
		         		addTaskFormSubmitUpdate={this.addTaskFormSubmitUpdate}
		         		data={this.state.addTaskData}
		         	/>
		        </Modal>
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
	
	changeTaskListData(){  // 获取任务列表

		const action = actionCreators.changeTaskListData();
		dispatch(action);
	},
});


export default connect(mapState,mapDispatch)(TaskList);



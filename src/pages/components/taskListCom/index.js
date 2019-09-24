

import React,{ PureComponent,Fragment } from 'react';
import { connect } from 'react-redux';

import { Table } from 'antd';

import {
	TaskListWrapper,
	HeaderNav,
	MainContent,
	ListTableAction,
	NoticeWrapper,
} from './style.js';

//import {List,isImmutable} from 'immutable';

import {
	Button,
	Modal,
	Carousel,
	Input,
	Form,
	Select,
	DatePicker,
	message,
} from 'antd';

import dataPickerLocale from 'antd/es/date-picker/locale/zh_CN';

import AddTaskForm from './common/addTaskForm.js';

import { 
	jsonClone,
	findArrKeyVal,
	addDataKey
} from "../../../utils/tool.js";

import moment from 'moment';

import api from '../../../fetchs/apis.js';

import { ipconfig } from '../../../fetchs/urls.js';

import { actionCreators } from '../../home/store';

import $ from 'jquery';

const { Option } = Select;
const { confirm } = Modal;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;


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
			    render:(text,record) => {
					return this.formatTaskStatusFn(record.is_finish);
			    }
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
			    title: '审核时间',
			    dataIndex: 'examine_time',
			    key: 'examine_time',
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
			    render: (text, record) => {

			    	return (
						<span>
					      	{
					      		record.is_finish == 0 &&
					      		((userInfo.auth_key == 'admin' && (userInfo.department_pk == record.department_pk)) || record.finish_preson_pk == userInfo.pk) 
					      		? <Button style={ListTableAction} size="small" type="primary" onClick={() => this.startTaskClick(text, record,'1')}>开始</Button> : ''
					      	}
					      	{
					      		record.is_finish == 1 && 
 					      		((userInfo.auth_key == 'admin' && (userInfo.department_pk == record.department_pk)) || record.finish_preson_pk == userInfo.pk) 
					      		? <Button style={ListTableAction} size="small" type="primary" onClick={() => this.startTaskClick(text, record,'0')}>停止</Button> : ''
					      	}
					      	{
					      		record.is_finish == 1 && 
					      		((userInfo.auth_key == 'admin' && (userInfo.department_pk == record.department_pk)) || record.finish_preson_pk == userInfo.pk)  
					      		? <Button style={ListTableAction} size="small" type="primary" onClick={() => this.finishTaskClick(text, record,'2')}>完成</Button> : ''
					      	}
					      	{
					      		record.is_finish == 2 && (userInfo.auth_key == 'admin' && (userInfo.department_pk == record.department_pk))
					      		? <Button style={ListTableAction} size="small" type="primary" onClick={() => this.finishTaskClick(text, record,'3')}>审核</Button> : ''
					      	}
							<Button style={ListTableAction} size="small" type="primary" onClick={() => {this.showTaskClick(text, record)}}>查看</Button>
					      	{
					      		record.is_finish == 0 && 
					      		(userInfo.auth_key == 'admin' && (userInfo.department_pk == record.department_pk) || record.publisher_person_pk == userInfo.pk) 
					      		? <Button style={ListTableAction} size="small" type="primary" onClick={() => {this.editTaskClick(text, record)}}>编辑</Button> : ""
					      	}
					      	{
					      		record.is_finish != 0 && 
					      		(userInfo.auth_key == 'admin' && (userInfo.department_pk == record.department_pk) || record.publisher_person_pk == userInfo.pk) 
					      		? <Button style={ListTableAction} size="small" type="primary" onClick={() => {this.resetTaskClick(text, record)}}>重置</Button> : ""
					      	}
					      	{
					      		(record.is_finish == 0 && record.publisher_person_pk == userInfo.pk) || 
					      		(userInfo.auth_key == 'admin' && (userInfo.department_pk == record.department_pk))
					      		? <Button style={ListTableAction} size="small" type="danger" onClick={() => {this.removeTaskClick(text,record)}}>删除</Button> : ""
					      	}
					      </span>
			    	)
			      
			    },
			    fixed:"right",
			    width:240,
			  },
			],
			finishStatus:'', // 任务完成状态
			finishList:[ // 状态数据
				{
					label:"全部",
					value:""
				},
				{
					label:"未完成",
					value:0
				},
				{
					label:"完成中",
					value:1
				},
				{
					label:"已完成",
					value:2
				},
				{
					label:"已审核",
					value:3
				}
			],
			addTaskModal:false,// 添加任务模态框
			taskOperaModel:'',// 任务是添加(add) 还是编辑(update)
			addTaskData:this.initAddTaskData(),
			taskListData:[],// 任务列表
			getTaskListParams:{},// 获取任务列表地参数
			overtimeTaskData:[],// 将要超时的任务
			finishConfirmModel:false,// 完成确认提示框
			finishConfirmData:{},// 完成的数据
			showTaskModalData:{},// 查看任务的数据
			showTaskModal:false,// 查看任务的modal
			searchDepartment:"all",//搜索的部门pk
			searchReleaseUser:"all",//搜索的发布人的pk
			searchFinishUser:"all",//搜索的完成人的pk
			searchProject:"all",//搜索的项目的pk
			searchEstimateTime:[],// 搜索项目的预计完成时间
			searchFinishTime:[],// 搜索项目的完成时间
			searchVal:"",// 搜索任务内容的值
			selectedTaskRowKeys:"",// 任务行的选择
			contentHeight:"",// 内容区的高度
		};

		this.addTaskOk = this.addTaskOk.bind(this);
		this.addTaskCancel = this.addTaskCancel.bind(this);
		this.showAddModal = this.showAddModal.bind(this);


	}

	componentDidMount(){

        
        this.setState({getTaskListParams: this.props.getTaskListParams},()=>{
        	this.fetchTaskList();
        });

        this.setState({
        	contentHeight:$(window).height() - 150
        });

	
	}

	static getDerivedStateFromProps(nextProps,nextState) { // 父组件重传props时就会调用这个方法

		let ret = {};

		
		let userInfo = nextProps.userInfo.toJS();
		// let userList = nextProps.userList.toJS();

		// 初始化 搜索部门的值
		if(nextState.searchDepartment == "all"){
			let searchDepartment = userInfo.department_pk ? parseInt(userInfo.department_pk) : "";
			ret["searchDepartment"] = searchDepartment;
		};

		// // 初始化 搜索发布人的值

		// if(!nextState.searchReleaseUser){

		// 	// 找到部门的负责人
		// 	for(let item of userList){

		// 		// 同一个部门
		// 		if(item.department_pk == userInfo.department_pk && (userInfo.auth_pk == 2)){

		// 			let searchReleaseUser = item.pk;
		// 			ret["searchReleaseUser"] = searchReleaseUser;
		// 			break;
		// 		};
		// 	}

		// };

		// 初始化该组件的参数
		ret["getTaskListParams"] = nextProps.getTaskListParams;

		return ret;
        
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

		let {
			searchDepartment,
			searchReleaseUser,
			searchFinishUser,
			searchProject,
			searchEstimateTime,
			searchFinishTime,
			searchVal,
		} = this.state;


		let params = {
			...this.state.getTaskListParams,
			searchVal
		};

		let  finishStatus = this.state.finishStatus;
		if(finishStatus !== ""){
			params["is_finish"] = finishStatus;
		};

		// 搜索条件
		// 部门
		if(searchDepartment != "all"){
			params["department_pk"] = searchDepartment;
		};

		// 发布人
		if(searchReleaseUser != "all"){
			params["publisher_person_pk"] = searchReleaseUser;
		};

		// 完成人
		if(searchFinishUser != "all"){
			params["finish_preson_pk"] = searchFinishUser;
		};

		// 项目
		if(searchProject != "all"){
			params["project_pk"] = searchProject;
		};

		// 预计完成时间
		if(searchEstimateTime.length == 2){

			let estimate_start = moment(searchEstimateTime[0]).format("YYYY-MM-DD") + " 00:00:00";
			let estimate_end = moment(searchEstimateTime[1]).format("YYYY-MM-DD") + " 23:59:59";

			params["estimate_start"] = estimate_start;
			params["estimate_end"] = estimate_end;

		};

		// 完成时间
		if(searchFinishTime.length == 2){

			let finishTime_start = moment(searchFinishTime[0]).format("YYYY-MM-DD") + " 00:00:00";
			let finishTime_end = moment(searchFinishTime[1]).format("YYYY-MM-DD") + " 23:59:59";

			params["finishTime_start"] = finishTime_start;
			params["finishTime_end"] = finishTime_end;

		};


		api.getTaskList(params).then(res => {
			console.log("获取任务列表");
			console.log(res);

			if(res.data.code == 0){

				let data = res.data.data;
				let newData = addDataKey(data,"key","pk");

				this.collOvertimeTaskData(newData);

				this.setState({
					taskListData:newData
				});

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

	formatTaskStatusFn = (val) => {  // 格式化任务状态

		let ret = "";

		if(val == 0){
			ret = "未完成";
		}else if(val == 1){
			ret = "进行中";
		}else if(val == 2){
			ret = "已完成";
		}else if(val == 3){
			ret = "已审核";
		};

		return ret;
	}

	showTaskClick = (text, record) => { // 产看任务

		this.setState({
			showTaskModal:true,
			showTaskModalData:{...record}
		});

	}

	editTaskClick = (text, record) => { // 任务编辑
		// console.log(this)
		// console.log(text)
		// console.log(record)

		let data = jsonClone(record);


		data["publisher_person_pk"] = parseInt(data["publisher_person_pk"]) || "";
		data["finish_preson_pk"] = parseInt(data["finish_preson_pk"]) || "";
		data["urgent_status"] = parseInt(data["urgent_status"]) || "";

		// 刷新表单数据
		if(this.addTaskFormRef){
			this.addTaskFormRef.resetFields();
		};

		this.setState({
			addTaskData:data,
			addTaskModal:true,
			taskOperaModel:"update"
		});

		console.log(this.state.addTaskData);


	}

	resetTaskClick = (text, record) => {  // 重置任务

		confirm({
			title:"提示",
			content:"此操作将重置完成状态，是否继续？",
			onOk:() => {

				let params = {
					pk:record.pk,
					is_finish:0,
					finish_time:"",
					finish_leav_msg:"",
					examine_time:"",
					examine_leav_msg:""
				};

				this.fetchUpdateTaskItem(params);
			}
		})
	}

	startTaskClick = (text, record,taskStatus) => { // 开始任务
		confirm({
			title:"提示",
			content:"此操作将开始该任务，是否继续？",
			onOk:() => {

				let params = {
					pk:record.pk,
					is_finish:taskStatus
				};

				this.fetchUpdateTaskItem(params);
			}
		})
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

	onAddTaskForm = (ref) => {

		this.addTaskFormRef = ref;
	}

	finishTaskClick = (text,record,taskStatus) => { // 完成任务 taskStatus：任务状态

		let content = "是否确认完成 " + record["publisher_person"] + " 发布的 " + record["project_name"] + " 项目的任务";

		let finishConfirmData = {
			content,
			pk:record.pk,
			is_finish:taskStatus,
			finish_leav_msg:""
		};

		this.setState({
			finishConfirmModel:true,
			finishConfirmData
		});

	}

	finishConfirmModelOk = () => { // 确认完成 modal 确定

	
		let finishConfirmData = {...this.state.finishConfirmData};

		let params = {
			pk:finishConfirmData.pk,
			is_finish:finishConfirmData.is_finish
		};

		// 当前时间
		let now = moment().format("YYYY-MM-DD HH:mm:ss");



		// 如果是完成需要填写完成时间和完成留言   审核同理
		if(finishConfirmData.is_finish == 2){ // 完成
			params["finish_leav_msg"] = finishConfirmData.finish_leav_msg;
			params["finish_time"] = now;

		}else if(finishConfirmData.is_finish == 3){// 审核
			params["examine_leav_msg"] = finishConfirmData.finish_leav_msg;
			params["examine_time"] = now;
		};

		this.fetchUpdateTaskItem(params);

		this.setState({
			finishConfirmModel:false
		});
	}

	finishConfirmModelCacel = () => { // 取消完成 modal 确定

		this.setState({
			finishConfirmModel:false
		});
	}

	updateFinishLeavMsgVal = (el) => { // 修改完成留言
		
		let value = el.target.value;
		let finishConfirmData = {...this.state.finishConfirmData};
		finishConfirmData["finish_leav_msg"] = value;

		this.setState({
			finishConfirmData
		});
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

		let userInfo = this.props.userInfo.toJS();
		return{
			publisher_person_pk:userInfo.pk ? parseInt(userInfo.pk) : 0,
			department_pk:userInfo.department_pk ? parseInt(userInfo.department_pk) : "",
			finish_preson_pk:"",
			finish_time:"",
			project_pk:"",
			task_content:"",
			estimate_time:"",
			urgent_status:2,
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

	collOvertimeTaskData = (taskList) => { // 手机即将超时任务

		let overtimeTaskData = [];

		// 用户pk
		let userInfo = this.props.userInfo.toJS();
		let userPk = userInfo.pk;
		// 3 小时
		let timeRange = 3 * 60 * 60 * 1000;
		for(let item of taskList){

			let estimageTime = moment(item["estimate_time"]).format("x");
			let nowTime = moment().format("x");

			if((userPk == item.finish_preson_pk && (estimageTime - nowTime) <= timeRange) && (item.is_finish == 0 || item.is_finish == 1)){

				overtimeTaskData.push(item);
			}

		};


		this.setState({
			overtimeTaskData
		});

	}

	closeShowTaskModal = () => { /// 关闭查看任务 modal

		this.setState({
			showTaskModal:false
		})
	}

	changeSearchDepartment = (val) => { // 部门搜索值改变


		// 如果发布人不是该部门则改为无限
		let { userList,projectList} = this.props;
		userList = userList.toJS();
		projectList = projectList.toJS();
		let { searchReleaseUser,searchFinishUser,searchProject } = this.state;

		for(let item of userList){

			// 发布人
			if(item.pk == searchReleaseUser && item.department_pk != val){
				this.setState({
					searchReleaseUser:"all"
				});
			}

			// 完成人 
			if(item.pk == searchFinishUser && item.department_pk != val){
				this.setState({
					searchFinishUser:"all"
				});
			}
		};

		// 如果项目的部门pk跟选择部门pk不匹配值清空
		for(let item of projectList){

			if(item.pk == searchProject && item.department_pk != val){

				this.setState({
					searchProject:"all"
				});
				break;
			}
		};

		this.setState({
			searchDepartment:val
		},() => {
			this.fetchTaskList();
		});

	}

	changeSearchReleaseUser = (val) => { //  发布人搜索值改变

		this.setState({
			searchReleaseUser:val
		},() => {
			this.fetchTaskList();
		});


	}

	changeSearchFinishUser = (val) => { //  完成人搜索值改变

		this.setState({
			searchFinishUser:val
		},() => {
			this.fetchTaskList();
		});
	}

	changeSearchProject = (val) => { // 项目搜索值改变
		this.setState({
			searchProject:val
		},() => {
			this.fetchTaskList();
		});
	}

	// 预计完成时间
	changeSearchEstimateTime = (val) => { // 预计完成搜索值改变

		this.setState({
			searchEstimateTime:val
		},() => {
			this.fetchTaskList();
		});
	}

	changeSearchFinishTime = (val) => { // 

		this.setState({
			searchFinishTime:val
		},() => {
			this.fetchTaskList();
		});
	}

	changeSearchVal = (event) => { // 搜索值改变

		let val = event.target.value;

		this.setState({
			searchVal:val
		})
	}

	pressEnterSearchVal = (event) => { // 搜索值回车

		event.persist();

		this.fetchTaskList();

	}


	exportTaskXlsx = () => { // 导出任务的xlsx表


		let userInfo = this.props.userInfo;
		userInfo = userInfo.toJS();


		if(this.state.selectedTaskRowKeys.length == 0){

			message.warning("请先选中任务！");
			return;
		}

		let params = {
			exportUser:userInfo.username, // 导出人
			data:JSON.stringify(this.state.selectedTaskRowKeys)
			//data:this.state.selectedTaskRowKeys
		};

		console.log(this.state.selectedTaskRowKeys)

		api.getTaskExportXlsx(params).then(res => {

			console.log("导出文件");
			console.log(res);

			if(res.data.code == 0){

				const a = document.createElement('a'); // 创建a标签
				a.setAttribute('download', '');// download属性
				a.setAttribute('href', ipconfig + "" + res.data.data);// href链接
				a.click();// 自执行点击事件
			}

		}).catch(err => {
			console.log(err);
		})
	}

	render(){

		//taskPageMode ： 页面的模式  (myFinishTask:我完成的，all：所有，myReleaseTask：我发布的)
		const { userInfo,departmentList,userList,taskPageMode,projectList } = this.props;
		const newUserInfo = userInfo.toJS();

		let { 
			finishList, 
			taskOperaModel, 
			taskListData, 
			overtimeTaskData, 
			showTaskModalData,
			searchDepartment,
			searchReleaseUser,
			searchFinishUser,
			searchProject,
			searchVal,
			contentHeight,
			addTaskData
		} = this.state;

		console.log(addTaskData);

		const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 4 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },		
	        sm: { span: 20 },
	      },
	     
	    };

	    const rowSelection = {
		  	onChange: (selectedRowKeys, selectedRows) => {
		    	//console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

		    	this.setState({
		    		selectedTaskRowKeys:selectedRows
		    	});
		  	},
		  	onSelect: (record, selected, selectedRows) => {
		    	//console.log(record, selected, selectedRows);
		  	},
		  	onSelectAll: (selected, selectedRows, changeRows) => {
		    	//console.log(selected, selectedRows, changeRows);
		  	},
		};


		return (
			<TaskListWrapper>
				{
					// 任务即将超时提醒
					overtimeTaskData.length > 0 ? (
						<NoticeWrapper>
							<Carousel
								autoplay
								dots={false}
								speed= {20000}
							    autoplaySpeed={10000}
							    cssEase="linear"
							    infinite={true}
							>
							    {

							    	overtimeTaskData.map((item) => {

							    		let task_content = item.task_content;

							    		// 如果内容大于30个字符则将 取前30个
							    		if(task_content.length > 30){
							    			task_content = task_content.slice(0,30) + "......";
							    		};

							    		return (

							    			<div className="notic-item" key={item.key}>
							    				{item.publisher_person}  发布的 {task_content} 将于 {item.estimate_time} 超时
							    			</div>
							    		)

							    	})
							    }
							  </Carousel>
						</NoticeWrapper>
					) : ""
				}
				
				<HeaderNav>
					<div className="header-item clearfix">
						<div className="btns-wrapper fl">
							{
								finishList.map((item,index) => {

									return (
										<div className="btns-item" key={item.value}>
											<Button 
												type={this.state.finishStatus === item.value ? 'primary' : ''} 
												size="small"
												onClick={()=> this.switFinishStatusFn(item)}
											>{item.label}</Button>
										</div>
									)
								})

							}
						</div>

						{
							
							/* 如果为任务列表才显示 */
							taskPageMode == "all" ? (

								<div className="filter-search-wr fl">
									<div className="search-item">
										<span className="tit">部门：</span>
										<Select 
											size="small"
											value={searchDepartment}
											onChange={this.changeSearchDepartment}
											style={{width:"120px"}}
										>
											<Option key="不限" value="all">不限</Option>
											{
												departmentList.map(item => {
													
													return(
														<Option key={item.pk} value={item.pk}>{item.name}</Option>
													)

												})
											}
										</Select>
									</div>

									<div className="search-item">
										<span className="tit">发布人：</span>
										<Select
											size="small"
											value={searchReleaseUser}
											onChange={this.changeSearchReleaseUser}
											style={{width:"100px"}}
										>

											<Option key="不限" value="all">不限</Option>
											{
											
												userList.map(item => {

													let opt = "";
													
													
													// 只显示管理层
													if(searchDepartment == "all"){
														if(item.auth_pk == 2){
															opt = <Option key={item.pk} value={item.pk}>{ item.username }</Option>
														}
													}else{
														if(item.auth_pk == 2 && item.department_pk == searchDepartment){
															opt = <Option key={item.pk} value={item.pk}>{ item.username }</Option>
														}
													}
													return (opt);
												})
											}
										</Select>
									</div>

									<div className="search-item">
										<span className="tit">完成人：</span>
										<Select
											size="small"
											value={searchFinishUser}
											onChange={this.changeSearchFinishUser}
											style={{width:"100px"}}
										>

											<Option key="不限" value="all">不限</Option>
											{
											
												userList.map(item => {

													let opt = "";

													// 只显示管理层
													if(searchDepartment == "all"){
														opt = <Option key={item.pk} value={item.pk}>{ item.username }</Option>
													}else{
														if(item.department_pk == searchDepartment){
															opt = <Option key={item.pk} value={item.pk}>{ item.username }</Option>
														}
													}

													return (opt);
												})
											}
										</Select>
									</div>

									<div className="search-item">
										<span className="tit">项目：</span>
										<Select 
											size="small"
											value={searchProject}
											onChange={this.changeSearchProject}
											style={{width:"140px"}}
										>
											<Option key="不限" value="all">不限</Option>
											{
												projectList.map(item => {

													let opt = "";

													if(searchDepartment == "all"){
														opt = <Option key={item.pk} value={item.pk}>{item.name}</Option>
													}else{
														if(item.department_pk == searchDepartment || !item.department_pk){
															opt = <Option key={item.pk} value={item.pk}>{item.name}</Option>
														}
													}
													
													return(
														opt
													)

												})
											}
										</Select>
									</div>

									
								</div>
							) : ""
						}


						<div className="btns-right fr">
							{
								newUserInfo.auth_key == "admin" ? (
									<Button className="btn-item" type="primary" size="small" onClick={this.showAddModal}>发布任务</Button>
								) : ""
							}
							<Button className="btn-item" type="primary" size="small" onClick={this.exportTaskXlsx}>导出xlsx</Button>
						
						</div>

						
						
					</div>
					{
						taskPageMode == "all" ? (
							<div className="header-item">
								<div className="filter-search-wr">

									<div className="search-item">
										<span className="tit">预计完成时间：</span>
										<RangePicker
											locale={dataPickerLocale}
											style={{width:"270px"}}
											size="small"
											onChange={this.changeSearchEstimateTime}
										></RangePicker>
									</div>

									<div className="search-item">
										<span className="tit">完成时间：</span>
										<RangePicker
											locale={dataPickerLocale}
											style={{width:"270px"}}
											size="small"
											onChange={this.changeSearchFinishTime}
										></RangePicker>
									</div>

									<div className="search-item">
										<span className="tit">搜索内容：</span>
										<Input 
											size="small"
											style={{width:"262px"}}
											value={searchVal}
											onPressEnter={this.pressEnterSearchVal}
											onChange={this.changeSearchVal}
										></Input>
									</div>
								</div>
							</div>
						) : ""

					}
					
				</HeaderNav>
				<MainContent className={taskPageMode == 'all' ? 'act' : ''}>
					<div className="main-content-wrapper" style={{height:contentHeight + 'px'}}>
						<Table dataSource={taskListData} columns={this.state.columns} rowSelection={rowSelection} scroll={{ x: 2300,y:1500}}/>
					</div>
					
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
		         		onRef={this.onAddTaskForm}
		         		addTaskFormFn={this.addTaskFormFn} 
		         		addTaskFormSubmitUpdate={this.addTaskFormSubmitUpdate}
		         		data={addTaskData}
		         	/>
		        </Modal>

		    	{/* 完成提示框 */}
		    	<Modal
		          title="提示"
		          visible={this.state.finishConfirmModel}
		          onOk={this.finishConfirmModelOk}
		          onCancel={this.finishConfirmModelCacel}
		        >
		          <p>{ this.state.finishConfirmData.content }</p>
		          <p style={{display:this.state.finishConfirmData.is_finish == 3 && this.state.finishConfirmData.finish_leav_msg ? 'block' : 'none'}}>
		          	完成留言： {this.state.finishConfirmData.finish_leav_msg}
		          </p>
		          <TextArea rows={4} value={this.state.finishConfirmData.finish_leav_msg} onChange={this.updateFinishLeavMsgVal}/>
		        </Modal>

		    	{/* 查看任务详情 */}
		    	<Modal
		          title="查看任务详情"
		           width="60%"
		          visible={this.state.showTaskModal}
		          onOk={this.closeShowTaskModal}
		          onCancel={this.closeShowTaskModal}
		        >
		          <Form {...formItemLayout}>
					<FormItem label="发布人">
						<Input value={showTaskModalData.publisher_person}/>
					</FormItem>
					<FormItem label="部门">
						<Input value={showTaskModalData.department}/>
					</FormItem>
					<FormItem label="内容">
						<TextArea value={showTaskModalData.task_content}/>
					</FormItem>
					<FormItem label="状态">
						<Select value={showTaskModalData.urgent_status}>
			          		<Option key="1" value={"1"}>紧急</Option>
			          		<Option key="2" value={"2"}>一般</Option>
			          		<Option key="3" value={"3"}>不急</Option>
					    </Select>
					</FormItem>
					<FormItem label="所属项目">
						<Input value={showTaskModalData.project_name}/>
					</FormItem>
					<FormItem label="发布时间">
						<Input value={showTaskModalData.create_time}/>
					</FormItem>
					<FormItem label="预计完成时间">
						<Input value={showTaskModalData.estimate_time}/>
					</FormItem>
					<FormItem label="完成时间">
						<Input value={showTaskModalData.finish_time}/>
					</FormItem>
					<FormItem label="审核时间">
						<Input value={showTaskModalData.examine_time}/>
					</FormItem>
					<FormItem label="完成人">
						<Input value={showTaskModalData.finish_preson}/>
					</FormItem>
					<FormItem label="完成人留言">
						<Input value={showTaskModalData.finish_leav_msg}/>
					</FormItem>
					<FormItem label="审核人留言">
						<Input value={showTaskModalData.examine_leav_msg}/>
					</FormItem>
		          </Form>
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





import React,{Component} from 'react';

import { connect } from 'react-redux';

import {
	UserManPageWrapper,
	Header,
	MainContent
} from "./style.js";

import { actionCreators as homeActionCreators } from '../home/store';

import {findArrKeyVal} from '../../utils/tool.js';

import api from '../../fetchs/apis.js';

import {
	Table,
	Button,
	Modal,
	Form,
	Input,
	Select,
} from "antd";



const { Option } = Select;

const FormItem = Form.Item;

const { confirm } = Modal;




class UserManPage extends Component{

	constructor(props){

		super(props);

		this.state = {
			columns : [
			  {
			    title: '序号',
			    dataIndex: 'num',
			    key: 'num',
			    render:(text,record,index) => {
			    	return(<span>{ (index + 1) }</span>)
			    }
			  },
			  {
			    title: '名称',
			    dataIndex: 'username',
			    key: 'username',
			  },
			  {
			    title: '部门',
			    dataIndex: 'department_name',
			    key: 'department_name',
			  },
			  {
			    title: '职位',
			    dataIndex: 'ranks_name',
			    key: 'ranks_name',
			  },
			  {
			    title: '权限',
			    dataIndex: 'auth_key',
			    key: 'auth_key',
			  },
			  {
			    title: '手机号',
			    dataIndex: 'phone',
			    key: 'phone',
			  },
			  {
			    title: '创建时间',
			    dataIndex: 'create_time',
			    key: 'create_time',
			  },
			  {
			    title: 'Action',
			    key: 'action',
			    render: (text, record) => {

			    	return (
				      <span>
				        	<Button type="danger" size="small" onClick={() => this.removeUserItem(text,record)}>删除</Button>
				      </span>
				    )
			    },
			  }	
			],
			isAddShowModel:false, // 是否显示添加用户modal
			addModalData:{ // 添加的modal数据
				title:"添加",
				data:{}
			}
		}

	}


	fetchAddUser = (params) => { // 添加用户


		api.getAddUser(params).then(res => {

			console.log("添加用户")
			console.log(res);

			if(res.data.code == 0){

				this.props.changeUserList();
			}

		}).catch(err => {

		});

	}

	fetchRemoveUser = (params) => { // 添加用户


		api.getRemoveUser(params).then(res => {

			console.log("删除用户")
			console.log(res);

			if(res.data.code == 0){

				this.props.changeUserList();
			}

		}).catch(err => {

		});

	}

	removeUserItem = (text,record) => { // 删除用户

		confirm({
		    title: '该操作将删除该用户，是否继续？',
		    content: 'Some descriptions',
		    onOk:() => {

		      let params = {
					pk:record.pk
				}

				this.fetchRemoveUser(params);
		    },
		    onCancel() {
		    },
		  });

		
	}

	initUserInfoParams = () => {

		let userInfo = this.props.userInfo.toJS();

		return {
			username: "",
			password: "",
			phone: "",
			department_pk: "",
			auth_pk:"",
			ranks_pk:"",
		}

		
	}

	submitAddProject = (e) => { // 提交添加任务

		e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', values);

	        let { 
				departmentList,
				authorityList,
				ranksList,
			}  = this.props;
			departmentList = departmentList.toJS();
			authorityList = authorityList.toJS();
			ranksList = ranksList.toJS();

	        let params = {...values};

	        params["auth_key"] = findArrKeyVal(authorityList,"pk",params.auth_pk)["name"];
	        params["department_name"] = findArrKeyVal(departmentList,"pk",params.department_pk)["name"];
	        params["ranks_name"] = findArrKeyVal(ranksList,"pk",params.ranks_pk)["name"];

	        this.fetchAddUser(params);

	        
	        this.setState({
				isAddShowModel:false,
			});

	        
	      }
	    });
	}

	addUserFn = () => {
		this.refs.submitRef.buttonNode.click();
	}

	cancelAddUserFn = () => {
		
		this.setState({
			isAddShowModel:false
		})
	}

	openAddUserModal = () => { // 打开添加用户的modal
		this.setState({
			isAddShowModel:true
		})
	}


	render(){

		const { getFieldDecorator } = this.props.form;

		let { 
			userList,
			departmentList,
			authorityList,
			ranksList,
		}  = this.props;
		userList = userList.toJS();
		departmentList = departmentList.toJS();
		authorityList = authorityList.toJS();
		ranksList = ranksList.toJS();


		let {
			columns,
			isAddShowModel,
			addModalData
		}  = this.state;

		
		const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 4 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },		
	        sm: { span: 20 },
	      },

	     }


		return(
			<UserManPageWrapper>
				<Header className="clearfix">
					<div className="nav-box rg-nav fr">
						<Button type="primary" size="small" onClick={this.openAddUserModal}> 添加 </Button>
					</div>
				</Header>
				<MainContent>
					<Table dataSource={userList} columns={columns} />;
				</MainContent>

				{/* 添加用户 */}
				<Modal
		          title={addModalData.title}
		          visible={isAddShowModel}
		          onOk={this.addUserFn}
		          onCancel={this.cancelAddUserFn}
		        >
		        	<Form {...formItemLayout} onSubmit={this.submitAddProject}>
						<FormItem label="用户名">
							{getFieldDecorator('username', {
					            initialValue:addModalData.data.username,
					            rules:[
					          		{ required: true, message: '必填' },
					          	]
					          })(
					          	<Input/>
					          )}
						</FormItem>
						<FormItem label="密码">
							{getFieldDecorator('password', {
					            initialValue:addModalData.data.password,
					            rules:[
					          		{ required: true, message: '必填' },
					          	]
					          })(
					          	<Input/>
					          )}
						</FormItem>
						<FormItem label="手机号">
							{getFieldDecorator('phone', {
					            initialValue:addModalData.data.phone,
					          })(
					          	<Input/>
					          )}
						</FormItem>
						<FormItem label="部门">
				          {getFieldDecorator('department_pk', {
				          	initialValue:addModalData.data.department_pk,
				          	rules:[
				          		{ required: true, message: '必填' },
				          	]
				          })(
				          	<Select
				          		defaultActiveFirstOption
				          	>
				          		{
				          			departmentList.map((item) => {

				          				let ret = <Option key={item.pk} value={item.pk}>{item.name}</Option>;
				          				
				          				return (
				          					ret
				          				)
				          				
				          			})
				          		}
						      
						    </Select>

				          )}


				        </FormItem>

				        <FormItem label="权限">
				          {getFieldDecorator('auth_pk', {
				          	initialValue:addModalData.data.auth_pk,
				          	rules:[
				          		{ required: true, message: '必填' },
				          	]
				          })(
				          	<Select
				          		defaultActiveFirstOption
				          	>
				          		{
				          			authorityList.map((item) => {

				          				let ret = <Option key={item.pk} value={item.pk}>{item.name}</Option>;
				          				
				          				return (
				          					ret
				          				)
				          				
				          			})
				          		}
						      
						    </Select>

				          )}


				        </FormItem>

				        <FormItem label="职位">
				          {getFieldDecorator('ranks_pk', {
				          	initialValue:addModalData.data.ranks_pk,
				          	rules:[
				          		{ required: true, message: '必填' },
				          	]
				          })(
				          	<Select
				          		defaultActiveFirstOption
				          	>
				          		{
				          			ranksList.map((item) => {

				          				let ret = <Option key={item.pk} value={item.pk}>{item.name}</Option>;
				          				
				          				return (
				          					ret
				          				)
				          				
				          			})
				          		}
						      
						    </Select>

				          )}


				        </FormItem>

				        <FormItem wrapperCol={{ span: 12, offset: 6 }} style={{opacity:0}}>
				          <Button ref="submitRef" type="primary" htmlType="submit">
				            Submit
				          </Button>
				        </FormItem>
		        	</Form>
	          
		        </Modal>
			</UserManPageWrapper>
		)
	}
}

const UsertManForm = Form.create()(UserManPage);

const mapState = (state) => ({
	userList:state.getIn(["home","userList"]),
	departmentList:state.getIn(["home","departmentList"]),
	authorityList:state.getIn(["home","authorityList"]),
	ranksList:state.getIn(["home","ranksList"]),
})

const mapDispatch = (dispatch) => ({
	
	changeUserList(){  // 获取用户列表

		const action = homeActionCreators.changeUserList();

		dispatch(action);
	},
})


export default connect(mapState,mapDispatch)(UsertManForm)





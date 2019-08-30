
import React,{Component} from 'react';

import { connect } from 'react-redux';

import {
	ProjectManWrapper,
	MainContent,
	ListTableAction,
	HeaderWrapper,
} from './style.js';

import {
	Table,
	Button,
	Modal,
	Form,
	Input,
} from 'antd';


import api from '../../fetchs/apis.js';

import { actionCreators as homeActionCreators} from '../home/store'

const FormItem = Form.Item;

const { confirm } = Modal;


class ProjectMan extends Component{

	constructor(props){

		super(props);

		this.state = {
			columns : [
				  {
				    title: '序号',
				    dataIndex: 'num',
				    key: 'num',
				    render: (text,record,index) => <a key={index}>{ index + 1}</a>,
				  },
				  {
				    title: '项目名称',
				    dataIndex: 'name',
				    key: 'name',
				  },
				  {
				    title: '部门',
				    dataIndex: 'department_name',
				    key: 'department_name',
				  },
					{
				    title: '新建人',
				    dataIndex: 'add_person_name',
				    key: 'add_person_name',
				  },
				  {
				    title: '新建时间',
				    dataIndex: 'create_time',
				    key: 'create_time',
				  },
				  {
				    title: 'Action',
				    key: 'action',
				    render: (text, record) => {

				    	return (
					      <span>
					        	<Button style={ListTableAction}  type="primary" size="small" onClick={()=>this.updateProjectClick(text, record)}>修改</Button>
					        	<Button style={ListTableAction}  type="danger" size="small" onClick={() => this.removeProjectItem(text,record)}>删除</Button>
					      </span>
					    )
				    },
				  }	
			],
			showAddProjectModal:false,//是否显示添加任务的modal
			addProjectModalData:{ // 添加任务的数据
				mode:"add",
				data:{}
			}
		}

	}

	fetchAddProject = (params) => { // 添加项目

		api.getAddProject(params).then(res => {

			console.log("添加项目");
			console.log(res);

			if(res.data.code == 0){

				// 刷新项目列表
				this.props.getProjectList();
			};

		}).catch(err => {

		});
	}

	fetchUpdateProject = (params) => { // 修改项目

		api.getUpdateProject(params).then(res => {

			console.log("修改项目");
			console.log(res);

			if(res.data.code == 0){

				// 刷新项目列表
				this.props.getProjectList();
			}
		}).catch(err => {

		})

	}

	updateProjectClick = (text, record) => { // 修改项目


		let addProjectModalData = {
			mode:"update",
			data:record
		};

		this.setState({
			showAddProjectModal:true,
			addProjectModalData
		});



		
	}

	removeProjectItem = (text,record) => { // 删除某个项目


		confirm({
			title: '提示',
		    content: '该操作将删除这个项目，是否继续？',
		    onOk:() => {
		      
		      let params = {
		      	pk:record.pk,
		      	status:0
		      };

		      this.fetchUpdateProject(params);
		    },
		    onCancel() {
		      
		    },
		})
	}



	initProjectParams = () => {

		let userInfo = this.props.userInfo.toJS();

		return {
			add_person_name: userInfo.username,
			add_person_pk: userInfo.pk ? parseInt(userInfo.pk) : "",
			department_name: userInfo.department_name,
			department_pk: userInfo.department_pk ? parseInt(userInfo.department_pk) : "",
			name:"",
		}

		
	}

	showAddProjectModalFn = () => { // 显示添加任务modal

		let addProjectModalData = {
			mode:"add",
			data:this.initProjectParams()
		};

		this.setState({
			showAddProjectModal:true,
			addProjectModalData
		});
	}

	addProjectFn = () => { // 确认添加任务

		this.refs.submitRef.buttonNode.click();

	
	}

	cancelAddProjectFn  = () => { // 取消添加任务

		this.setState({
			showAddProjectModal:false,
		});

	}

	submitAddProject = (e) => { // 提交添加任务

		e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', values);

	        let allParams = {...this.state.addProjectModalData.data,...values};

	        if(this.state.addProjectModalData.mode == "add"){

	        	this.fetchAddProject(allParams);

	        }else if(this.state.addProjectModalData.mode == "update"){

	        	let params = {
	        		pk:allParams.pk,
	        		name:allParams.name
	        	};
				this.fetchUpdateProject(params);
	        }

	        
	        this.setState({
				showAddProjectModal:false,
			});

	        
	      }
	    });
	}


	render(){


		const { getFieldDecorator } = this.props.form;

		let {
			projectList
		} = this.props;

		let {
			columns,
			showAddProjectModal,
			addProjectModalData,
		} = this.state;

		projectList = projectList.toJS();

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

		return (
			<ProjectManWrapper>
				<HeaderWrapper>
					<div className="btns-right fr">
						<Button type="primary" size="small" onClick={this.showAddProjectModalFn}>添加</Button>
					</div>
				</HeaderWrapper>
				<MainContent>
					<Table dataSource={projectList} columns={columns}></Table>
				</MainContent>

				{/* 添加任务 */}
				<Modal
		          title={ addProjectModalData.mode == 'add' ? "添加项目" : '修改项目' }
		          visible={showAddProjectModal}
		          onOk={this.addProjectFn}
		          onCancel={this.cancelAddProjectFn}
		        >
		          <Form {...formItemLayout} onSubmit={this.submitAddProject}>
					<FormItem label="添加人">
						{getFieldDecorator('add_person_name', {
				            initialValue:addProjectModalData.data.add_person_name,
				          })(
				          	<Input disabled/>
				          )}
					</FormItem>
					<FormItem label="部门">
						{getFieldDecorator("department_name",{
							initialValue:addProjectModalData.data.department_name
						})(
							<Input disabled/>
						)}
					</FormItem>
					<FormItem label="项目名称">
						{getFieldDecorator("name",{
							initialValue:addProjectModalData.data.name,
							rules:[
				          		{ required: true, message: '必填' },
				          	]
						})(
							<Input/>
						)}
					</FormItem>

					<FormItem wrapperCol={{ span: 12, offset: 6 }} style={{opacity:0}}>
			          <Button ref="submitRef" type="primary" htmlType="submit">
			            Submit
			          </Button>
			        </FormItem>
		          </Form>

		        </Modal>
				
			</ProjectManWrapper>
		)
	}
}


const ProjectManForm = Form.create()(ProjectMan);

const mapState = (state) => ({
	userInfo:state.getIn(["login","userInfo"]),
	projectList:state.getIn(["home","projectList"]),
});

const mapDispatch = (dispatch) => ({

	getProjectList(){ // 获取项目列表
	
		const action = homeActionCreators.getProjectList();
		dispatch(action);
	}
})


export default connect(mapState,mapDispatch)(ProjectManForm);



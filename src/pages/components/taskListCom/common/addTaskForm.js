

import React,{PureComponent} from 'react';

import { connect } from "react-redux";

import moment from 'moment';

import { 
	Form,
	Input,
	Select,
	DatePicker,
	Button
 } from 'antd';

 const FormItem = Form.Item;


 const { Option } = Select;

 const { TextArea } = Input;



 class AddTaskForm extends PureComponent{

 	componentDidMount(){


 		this.props.addTaskFormFn(this)
 	}


 	submitFn = () => { // 触发表单submit
		this.refs.submitRef.buttonNode.click();
 	}

 	handleSubmit = (e) => {

 		e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', values);

	        this.props.addTaskFormSubmitUpdate(values);
	      }
	    });
 	};



 	render(){

 		const { getFieldDecorator } = this.props.form;

 		//console.log(this.props)

 		let { data,userList, departmentList,projectList } = this.props;
 		userList = userList.toJS();
 		departmentList = departmentList.toJS();
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
	    };

 		return(
 			<Form {...formItemLayout} onSubmit={this.handleSubmit}>
				<FormItem label="发布人">
		          {getFieldDecorator('publisher_person_pk', {
		            initialValue:data.publisher_person_pk,
		            rules:[
		          		{ required: true, message: '必填' },
		          	]
		          })(
		          	<Select
		          		defaultActiveFirstOption={true}
		          		disabled
		          	>
		          		{
		          			userList.map((item) => {

		          				return (
		          					<Option key={item.pk} value={item.pk}>{item.username}</Option>
		          				)
		          				
		          			})
		          		}
				      
				    </Select>

		          )}


		        </FormItem>

		        <FormItem label="部门">
		          {getFieldDecorator('department_pk', {
		          	initialValue:data.department_pk,
		          	rules:[
		          		{ required: true, message: '必填' },
		          	]
		          })(
		          	<Select
		          		defaultActiveFirstOption
		          		disabled
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

		        <FormItem label="内容">

		        	{getFieldDecorator('task_content',{
		        		initialValue:data.task_content,
		        		rules:[
			          		{ required: true, message: '必填' },
			          	]
		        	})(

		        		<TextArea 
		        			autosize={{ minRows: 2, maxRows: 6 }}
		        		/>
		        	)}

		        </FormItem>


		        <FormItem label="所属项目">

		        	{
		        		getFieldDecorator("project_pk",{
		        			initialValue:data.project_pk,
		        			rules:[
				          		{ required: true, message: '必填' },
				          	]
		        		})(

		        			<Select
		        				defaultActiveFirstOption
		        			>
		        				{
		        					projectList.map((item,index) => {

		        						let ret = <Option key={item.pk} value={item.pk}>{item.name}</Option>
		        						
				          				return (ret)
	
			        				})
		        				}
		        				

		        			</Select>	
		        		)
		        	}

		        </FormItem>

		        <FormItem label="预计完成时间">
					{
						getFieldDecorator("estimate_time",{
							initialValue:data.estimate_time ? moment(data.estimate_time) : moment(),
							rules:[
				          		{ required: true, message: '必填' },
				          	]
						})(
							<DatePicker 
								showTime={true}
							/>

						)
					}
		        </FormItem>

		        <FormItem label="完成人">
		          {getFieldDecorator('finish_preson_pk', {
		            initialValue:data.finish_preson_pk,
		            rules:[
		          		{ required: true, message: '必填' },
		          	]
		          })(
		          	<Select
		          		defaultActiveFirstOption={true}
		          	>
		          		{
		          			userList.map((item) => {

		          				let ret = "";

		          				// 只能选同一个部门下的人
		          				if(item.department_pk == data.department_pk){

		          					ret = <Option key={item.pk} value={item.pk}>{item.username}</Option>
		          				}


		          				return (
		          					ret
		          				)
		          				
		          			})
		          		}
				      
				    </Select>

		          )}
		        </FormItem>
		        <FormItem label="紧急程度">
		          {getFieldDecorator('urgent_status', {
		            initialValue:data.urgent_status,
		            rules:[
		          		{ required: true, message: '必填' },
		          	]
		          })(
		          	<Select
		          		defaultActiveFirstOption={true}
		          	>
		          		<Option key="1" value={1}>紧急</Option>
		          		<Option key="2" value={2}>一般</Option>
		          		<Option key="3" value={3}>不急</Option>
				      
				    </Select>

		          )}
		        </FormItem>

		        <FormItem wrapperCol={{ span: 12, offset: 6 }} style={{opacity:0}}>
		          <Button ref="submitRef" type="primary" htmlType="submit">
		            Submit
		          </Button>
		        </FormItem>
		        

	          </Form>
 		)
 	}

 }

const AddTaskFormForm = Form.create()(AddTaskForm);

const mapState = (state) => ({
	userList:state.getIn(['home',"userList"]),
	departmentList:state.getIn(['home','departmentList']),
	projectList:state.getIn(['home','projectList'])
});

const mapDispatch = (dispatch) => ({

});

export default connect(mapState,mapDispatch)(AddTaskFormForm);







import React,{  PureComponent} from 'react';
import { connect } from 'react-redux';

import {
	LoginWrapper
} from './style.js';

import $store from 'store';

import { Checkbox } from 'antd';

// 接口
import $api from '../../fetchs/apis.js';

import {
	changeUserInfo
} from './store/actionCreators.js';

class Login extends PureComponent{

	constructor(props){

		super(props);

		this.state = {
			username:"",
			password:"",
			rememberPwd:true
		}

		this.loginFn = this.loginFn.bind(this);
		this.changeUsername = this.changeUsername.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.changeRemember = this.changeRemember.bind(this);
	}


	componentDidMount(){

		this.initUsernamePwd();
	}



	initUsernamePwd(){ // 判断浏览器中是否有存在的 用户名密码，如果有则赋值

		let jasonWorkMan = $store.get("jasonWorkMan");

		if(jasonWorkMan){

		    this.setState((prevState, props) => ({
	        	username:jasonWorkMan.username,
				password:jasonWorkMan.password
		    }));

		};
	}


	loginFn(){  //登录

		//将账号密码存到locaStorage
		if(this.state.rememberPwd){ //记住密码

			let jasonWorkMan = {
				username:this.state.username,
				password:this.state.password
			};

			$store.set("jasonWorkMan",jasonWorkMan);

		}else{ //清空记住的密码

			$store.remove("jasonWorkMan");
		};


		let params = {
			username:this.state.username,
			password:this.state.password
		};

		$api.getLogin(params).then(res => {

			console.log("登录");
			console.log(res);

			if(res.data.code == 0){

				if(res.data.data["pk"] > 0){
					
					console.log("登录成功");
					this.props.history.push("/home");

					let userInfo = res.data.data;
					this.props.changeUserInfo(userInfo);

				}else{
					alert("登录失败")
				};
			};

		}).catch(err => {

			console.log(err);
		});
	}

	changeUsername(e){  // 修改用户名

		e.persist()

		this.setState({
			username:e.target.value
		});

	}

	changePassword(e){ //修改密码

		e.persist()

		this.setState({
			password:e.target.value
		});

	}

	changeRemember(e){ // 记住密码

		let isChecked = e.target.checked;

		this.setState({
			rememberPwd:isChecked
		});




	}

	render(){


		return (
				<LoginWrapper imgUrl="../../assets/images/bg.png">
					<div className="login">
					  	<h1>登&nbsp;&nbsp;&nbsp;&nbsp;录</h1>
					  	 <div className="line lineName">
					 		<span className="iconfont icon-user">&#xe726;</span>
					 	    <input type="" placeholder="请输入用户名" defaultValue={this.state.username} onChange={this.changeUsername}/>
					  	 </div>
					  	 <div className="nameT tips"></div>
					  	 <div className="line linePsd">
					  	 	<span className="iconfont iconpassword" >&#xe82b;</span>
					  	 	<input type="password" name="password" id="password"placeholder="请输入密码" defaultValue={this.state.password} onChange={this.changePassword}/>
					  	 </div>
					  	 <div className="psdT tips"></div>
					  	  <div className="line_top">
					  	 	<Checkbox className="f_l" checked={this.state.rememberPwd} onChange={this.changeRemember}>记住密码</Checkbox>
					  	 </div>
					  	 <div className="btn">
					  	 	<button onClick={this.loginFn}>登&nbsp;&nbsp;&nbsp;&nbsp;录</button>
					  	 </div>
					  </div>

				</LoginWrapper>
			)
	}
}


const mapState = (state) => ({

});

const mapDispatch = (dispatch) => ({

	changeUserInfo(userInfo){ // 更新 用户信息


		dispatch(changeUserInfo(userInfo));
	}
});


export default connect(mapState,mapDispatch)(Login);


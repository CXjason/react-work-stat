

import styled from 'styled-components';

import pageBg from '../../assets/images/bg.png';


export const LoginWrapper = styled.div`

    position: relative;
    height: 100%;
    background:url(${pageBg}) left top no-repeat;
    background-size:100%;
    overflow:hidden;

	.login{
		width: 395px;
		 height: 370px;
		 position: relative;
		 margin-top: -200px;
		 margin-left: -185px;
		 left: 50%;
		 top: 50%;
		 background:#FFFFFF;
		 border-radius: 5px;
		 padding: 20px;

		 h1{
		 	text-align: center;
		 	font-size: 30px;
		 	margin-bottom: 30px;
		 	padding-bottom: 10px;
		 	border-bottom: 1px solid #ddd;
		 	color: #333;
		 }
		 .line{
		 	height: 40px;
		   border: 1px solid #ddd;
		   position: relative;
		 }

		  .line span{
		  	position: absolute;
		  	display: inline-block;
		  	left:5px;
		  	top: 5px;
		  	color: #aca2a2;
		  	height:26px;
		  	font-size: 24px;
		  }
		  .line input{
		  	outline: none;
		  	width: 86%;
		  	height: 35px;
		  	line-height: 35px;
		    border: none;
		    background: none;
		    font-size: 16px;
		    margin-left: 38px;
		    color: #333;
		    user-select: none;
			-moz-user-select: none;
			-webkit-user-select: none;
			-ms-user-select: none;
		  }
		  .line_top{
		  	margin-top: 20px;
		  	font-size: 14px;
		  	overflow: hidden;
		  }
		  .line_top label{
		    line-height: 12px;
		    margin-left: 5px;
		  }
		  .btn{
		  	margin-top: 30px;
		  	text-align: center;
		  	
		  }
		  .btn button{
		  	width: 210px;
		  	height: 40px;
		  	line-height: 40px;
		  	text-align: center;
		  	color: #fff;
		  	background: #027cad;
		  	border: none;
		  	margin: 0px auto;
		  	border-radius: 5px;
		  	cursor: pointer;
		  	font-size: 18px;
		  }
		.btn button:hover{
			background: #1092c7;
		}
		.tips{
			color: red;
			height:25px;
			line-height: 25px;
			font-size: 12px;
			
		}
	}
	
`;



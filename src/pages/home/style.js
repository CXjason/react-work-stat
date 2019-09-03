


import styled from 'styled-components';



export const HomeWrapper = styled.div`
	
	width:100%;
	height:100%;
	overflow:hidden;
	//background-color:red;

	.bot-info-wrapper{

		position:relative;
		height:100%;
		box-sizing:border-box;
		overflow:hidden;
		margin-left:160px;

	}
`;


export const LayerWrapper = styled.div`
	
	width:100%;
	height:60px;
	position:absolute;
	left:0;
	top:0;
	background-color:#333;

	.wr-box{
		height:100%;
		line-height:60px;

		.rig-wr{
			padding-right:18px;
			color:#fff;
			line-height:60px;
			color:#fff;
			font-size:13px;

			.username{
				font-size:14px;
			}
		}
	}

`;



export const LeftMenuWrapper = styled.div`

	width:160px;
	height:100%;
	background-color:#333;
	float:left;


`;


export const RightContentWrapper = styled.div`
	height:100%;
	position:relative;
	padding-top:60px;
	box-sizing:border-box;
	overflow:hidden;

	
	.router-wrapper-route{
		height:100%;
		position:relative;
	}

`;


export const LeftMenuTop = styled.div`
	
	width:100%;
	.logo-wrapper{
		width:100%;
		height:60px;
		text-align:center;
		line-height:60px;
		color:#fff;
		font-size:18px;
		font-weight:bold;
	}

	.list{

		padding-top:20px;

		.list-item{

			display:block;

			span{
				display:block;
				text-align:center;
				padding:8px 0;
				font-size:14px;
				color:#fff;
				cursor:pointer;
			}
		}

		.selected{
			background-color:#1890ff;
		}
	}

`;

export const LeftMenuBottom = styled.div`
	
	width:100%;	
`;
















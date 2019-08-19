


import styled from 'styled-components';



export const HomeWrapper = styled.div`
	
	width:100%;
	height:100%;
	overflow:hidden;
	//background-color:red;

	.bot-info-wrapper{

		position:relative;
		height:100%;
		padding-top:60px;
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
	overflow:hidden;
	// background-color:yellow;
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

			span{
				display:block;
				text-align:center;
				padding:8px 0;
				font-size:14px;
				color:#fff;
				cursor:pointer;
			}
		}
	}

`;

export const LeftMenuBottom = styled.div`
	
	width:100%;	
`;
















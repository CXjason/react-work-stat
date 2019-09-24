

import styled from 'styled-components';


export const PersonWorkStatComWrapper = styled.div`
	position:relative;
	height:100%;	
`;



export const HeaderWrapper = styled.div`
	
	position:absolute;
	left:0;
	top:0;
	width:100%;
	height:40px;
	z-index:10;	

	.header-item{
		height:100%;
		display:flex;
		align-items:center;
		padding-left:10px;
		float:left;
	}
`;

export const MainContent = styled.div`
	position:relative;
	height:100%;
	padding-top:40px;
	box-sizing:border-box;	


	.graphical-wrapper{

		.graphical-item{

			float:left;
			margin-right:30px;
			margin:-top:20px;
		}
	}
`;



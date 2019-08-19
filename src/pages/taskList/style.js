
import styled from 'styled-components';


export const TaskListWrapper = styled.div`
	height:100%;
	position:relative;
	padding:10px;

`;


export const HeaderNav = styled.div`
	
	position:absolute;
	left:0;
	top:0;
	width:100%;
	height:40px;
	z-index:10;

	.btns-wrapper{
		height:100%;
		display:flex;
		align-items: center;
		padding-left:20px;

		.btns-item{
			margin-right:14px;
		}
	}

	.btns-right{
		height:100%;
		display:flex;
		align-items: center;
		padding-right:20px;
	}
`;

export const MainContent = styled.div`
	position:relative;
	height:100%;
	padding-top:40px;
	box-sizing:border-box;
`;


export const ListTableAction = {
	'marginRight':'4px'
};




import styled from 'styled-components';


export const TaskListWrapper = styled.div`
	height:100%;
	position:relative;
	padding:10px;

`;


export const HeaderNav = styled.div`
	
	position:absolute;
	left:0;
	top:34px;
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
	padding-top:64px;
	box-sizing:border-box;
`;


export const ListTableAction = {
	'marginRight':'4px'
};



/* 公告 */
export const NoticeWrapper = styled.div`
	
	height:24px;
	line-height:24px;
	background-color:#ccc;
	position:absolute;
	left:0;
	top:10px;
	width:100%;
	z-index:10;

`;


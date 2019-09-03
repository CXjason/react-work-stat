
import styled from 'styled-components';


export const TaskListWrapper = styled.div`
	height:100%;
	position:relative;
	min-width:1400px;

`;


export const HeaderNav = styled.div`
	
	position:absolute;
	left:0;
	top:34px;
	width:100%;
	z-index:10;
	background-color:#fff;

	.header-item{
		padding-bottom:8px;
	}

	.btns-wrapper{
		height:100%;
		display:flex;
		align-items: center;
		padding-left:20px;

		.btns-item{
			margin-right:14px;
		}
	}

	.filter-search-wr{
		height:100%;
		display:flex;
		align-items: center;
		padding-left:20px;

		.search-item{
			margin-right:14px;
		}
	}



	.btns-right{
		height:100%;
		display:flex;
		align-items: center;
		padding-right:20px;

		.btn-item{
			margin-right:6px;
		}
	}
`;

export const MainContent = styled.div`
	position:relative;
	height:90%;
	padding-top:64px;
	box-sizing:border-box;
	

	&.act{
		padding-top:88px;
	}

	.main-content-wrapper{
		position:relative;
		height:100%;
		overflow-y:auto;
	}
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


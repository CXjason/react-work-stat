

import styled from 'styled-components';


export const UserManPageWrapper = styled.div`
	position:relative;
	height:100%;
	min-width:1400px;
`;


export const MainContent = styled.div` 
	position:relative;
	height:100%;
	padding-top:40px;
	box-sizing:border-box;

	.main-content-ins{
		position:relative;
		height:100%;
		overflow-y:auto;
	}
`


export const Header = styled.div` 
	
	height:40px;
	position:absolute;
	left:0;
	top:0;
	width:100%;
	z-index:10;
	

	.nav-box{
		height:100%;
		padding-right:20px;
		display:flex;
		align-items:center;
	}
`;




import React,{ Fragment } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { GlobalStyle } from './style.js';

import "antd/dist/antd.css";

ReactDOM.render((
		<Fragment>
			<App />
			<GlobalStyle />
		</Fragment>
	), document.getElementById('root'));


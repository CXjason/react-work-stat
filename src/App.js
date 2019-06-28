

import React from 'react';
import { BrowserRouter,Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';

import Home from './pages/home/index.js';


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      	<Route path="/" exact component={Home}></Route>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

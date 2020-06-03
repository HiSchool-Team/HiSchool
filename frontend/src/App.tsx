import React from 'react';
import './App.css';
import { Router } from 'react-router-dom';
import BaseRouter from './routes';
import 'antd/dist/antd.css';

import history from './history';

const App = () => {
  return (
    <div className="App">
      <Router history={history}>
        <BaseRouter/>
      </Router>
    </div>
  );
}

export default App;


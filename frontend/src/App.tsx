import React from 'react';
import { Router } from 'react-router-dom';
import BaseRouter from './routes';
import 'antd/dist/antd.css';

import history from './utils/history'

const App = () => {
  return (
    <div className="App">
      <Router history={history}>
        <BaseRouter/>
      </Router>
    </div>
  );
};

export default App;

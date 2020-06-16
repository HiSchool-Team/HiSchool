import React from 'react';
import { Router } from 'react-router-dom';
import BaseRouter from './routes';
import 'antd/dist/antd.css';

import history from './utils/history'
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

const App = () => {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
      <Router history={history}>
        <BaseRouter/>
      </Router>
      </DndProvider>
    </div>
  );
};

export default App;

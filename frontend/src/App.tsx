import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import BaseRouter from "./routes";
import OtherRouter from "./routes";
import 'antd/dist/antd.css';

import NewLayout from "./containers/NewLayout";

function App() {
    return (
        <div className="App">
            <Router>
                    <BaseRouter/>
            </Router>
        </div>
    );
}

export default App;


import React from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import BaseRouter from './routes'
import 'antd/dist/antd.css'

import NewLayout from './containers/NewLayout'

const App = () => (
  <div className="App">
    <Router>
      <NewLayout>
        <BaseRouter/>
      </NewLayout>
    </Router>
  </div>
)

export default App

import React from 'react'
import { Route } from 'react-router-dom'

import SchoolList from './containers/SchoolListView'
import SchoolDetail from './containers/SchoolDetailView'
import QASection from './containers/QASection'
import QAAdminSection from "./containers/QAAdminSection";

const BaseRouter = () => (
  <div className={'base-router'}>
    <Route exact path={'/'} component={SchoolList}/>
    <Route exact path={'/:schoolID/q_and_a'} component={QASection}/>
    <Route exact path={'/:schoolID/q_and_a_admin'} component={QAAdminSection}/>
    <Route exact path={'/:schoolID'} component={SchoolDetail}/>
  </div>
)

export default BaseRouter

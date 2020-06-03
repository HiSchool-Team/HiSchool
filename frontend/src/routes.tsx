import React from 'react';
import { Route } from 'react-router-dom';

import SchoolList from './containers/views/SchoolListView';
import SchoolDetail from './containers/views/SchoolDetailView';
import QAUserView from './containers/views/QAUserView';

const BaseRouter = () => (
  <div className={'base-router'}>
    <Route exact path={'/'} component={SchoolList}/>
    <Route exact path={'/:schoolID/q_and_a'} component={QAUserView}/>
    <Route exact path={'/:schoolID'} component={SchoolDetail}/>
  </div>
);

export default BaseRouter;

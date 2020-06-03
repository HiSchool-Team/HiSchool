import React from 'react';
import { Route } from 'react-router-dom';

import SchoolList from './containers/views/SchoolList';
import SchoolDetail from './containers/views/SchoolDetail';
import QAUser from './containers/views/qa/QAUser';
import QAAdmin from './containers/views/qa/QAAdmin';

const BaseRouter = () => (
  <div className={'base-router'}>
    <Route exact path={'/'} component={SchoolList}/>
    <Route exact path={'/:schoolID/qa'} component={QAUser}/>
    <Route exact path={'/:schoolID/qa/admin'} component={QAAdmin}/>
    <Route exact path={'/:schoolID'} component={SchoolDetail}/>
  </div>
);

export default BaseRouter;

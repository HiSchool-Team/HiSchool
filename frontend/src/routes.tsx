import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Frontpage from './containers/views/Frontpage';
import SchoolList from './containers/views/SchoolList';
import SchoolDetail from './containers/views/SchoolDetail';
import QAUser from './containers/views/qa/QAUser';
import QAAdmin from './containers/views/qa/QAAdmin';
import SavedSchools from './containers/views/saved_items/SavedSchools'

const BaseRouter = () => (
  <div className={'base-router'}>
    <Switch>
      <Route exact path={'/'} component={Frontpage}/>
      <Route exact path={'/schools'} component={SchoolList}/>
      <Route exact path={'/savedSchools'} component={SavedSchools}/>
      <Route exact path={'/:schoolID/qa'} component={QAUser}/>
      <Route exact path={'/:schoolID/qa/admin'} component={QAAdmin}/>
      <Route exact path={'/:schoolID'} component={SchoolDetail}/>
    </Switch>
  </div>
);

export default BaseRouter;

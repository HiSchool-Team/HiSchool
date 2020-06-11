import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Frontpage from './containers/views/Frontpage';
import SchoolList from './containers/views/SchoolList';
import SchoolDetail from './containers/views/SchoolDetail';
import SavedSchools from './containers/views/saveditems/SavedSchools';
import SavedQAs from './containers/views/saveditems/SavedQAs';
import SchoolDetailAdmin from './containers/views/SchoolDetailAdmin';
import QAView from './containers/views/QAView';

const BaseRouter = () => (
  <Switch>
    <Route exact path={'/'} component={Frontpage}/>
    <Route exact path={'/schools'} component={SchoolList}/>
    <Route exact path={'/user/savedQAs'} component={SavedQAs}/>
    <Route exact path={'/user/savedSchools'} component={SavedSchools}/>
    <Route exact path={'/:schoolID/qa'}><QAView isAdmin={false}/></Route>
    <Route exact path={'/:schoolID/qa/admin'}><QAView isAdmin={true}/></Route>
    <Route exact path={'/:schoolID'} component={SchoolDetail}/>
    <Route exact path={'/:schoolID/admin'} component={SchoolDetailAdmin}/>
  </Switch>
);

export default BaseRouter;

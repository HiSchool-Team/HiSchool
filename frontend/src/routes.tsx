import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Frontpage from './containers/views/Frontpage';
import SchoolList from './containers/views/SchoolList';
import SchoolDetail from './containers/views/SchoolDetail';
import QAView from './containers/views/QAView';

const BaseRouter = () => (
  <div className={'base-router'}>
    <Switch>
      <Route exact path={'/'} component={Frontpage}/>
      <Route exact path={'/schools'} component={SchoolList}/>
      <Route exact path={'/:schoolID/qa'} render={props => <QAView {...props} isAdmin={false}/>} />
      <Route exact path={'/:schoolID/qa/admin'} render={props => <QAView {...props} isAdmin={true}/>} />
      <Route exact path={'/:schoolID'} component={SchoolDetail}/>
    </Switch>
  </div>
);

export default BaseRouter;

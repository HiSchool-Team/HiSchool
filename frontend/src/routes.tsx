import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Frontpage from './containers/views/Frontpage';
import PreferenceChoices from './containers/views/PreferenceChoices';
import SchoolList from './containers/views/SchoolList';
import SchoolDetail from './containers/views/SchoolDetail';
import SavedSchools from './containers/views/saveditems/SavedSchools';
import SavedQAs from './containers/views/saveditems/SavedQAs';
import SchoolDetailAdmin from './containers/views/SchoolDetailAdmin';
import QAView from './containers/views/qa/QAView';
import QAUnanswered from './containers/views/qa/QAUnanswered';
import LogIn from './containers/views/LogIn';
import SignUp from './containers/views/SignUp';
import SchoolListTagResult from './containers/views/SchoolListTagResult';

export const qaUnansweredPath = '/qa/unanswered';
export const homePath = '/';
export const loginPath = '/logIn';
export const signupPath = '/signUp';
export const savedSchoolsPath = '/user/savedSchools';
export const savedQAsPath = '/user/savedQAs';
export const tagResultPath = '/tagResult';
export const schoolTagAddPath = '/tagAddSchool';
export const prefChoicesPath = '/pref';
export const registerSchoolPath = '/qa/admin'; // Don't change or this gets broken

const BaseRouter = () => (
  <Switch>
    <Route exact path={homePath} component={Frontpage}/>
    <Route exact path={prefChoicesPath} component={PreferenceChoices}/>
    <Route exact path={'/schools'} component={SchoolList}/>
    <Route exact path={loginPath} component={LogIn}/>
    <Route exact path={signupPath} component={SignUp}/>
    <Route exact path={savedQAsPath} component={SavedQAs}/>
    <Route exact path={savedSchoolsPath} component={SavedSchools}/>
    <Route exact path={tagResultPath} component={SchoolListTagResult}/>
    <Route exact path={schoolTagAddPath} component={PreferenceChoices}/>
    <Route exact path={'/:schoolID/qa'}><QAView isAdmin={false}/></Route>
    <Route exact path={'/:schoolID/qa/admin'}><QAView isAdmin={true}/></Route>
    <Route exact path={'/:schoolID'} component={SchoolDetail}/>
    <Route exact path={registerSchoolPath} component={SchoolDetailAdmin}/>
    <Route exact path={qaUnansweredPath} component={QAUnanswered} />
  </Switch>
);

export default BaseRouter;

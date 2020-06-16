import React from 'react';
import userContext from '../context/User';
import authAPI from '../api/Auth';
import { homePath, loginPath, qaUnansweredPath, savedQAsPath, savedSchoolsPath, signupPath } from '../routes';

const HeaderMenu = () => {
  return (
    <div style={{ textAlign: 'right' }}>
      <a style={{ margin: '8px' }} href={homePath}>Home</a>
      {userContext.isApplicantAccount() && [
        <a style={{ margin: '8px' }} href={savedSchoolsPath}>Saved Schools</a>,
        <a style={{ margin: '8px' }} href={savedQAsPath}>Saved Questions</a>
      ]}
      {userContext.isSchoolAccount() && !userContext.hasRegisteredSchool() &&
      <a style={{ margin: '8px' }} href={'/qa/admin/'}>Register School</a>
      }
      <a style={{ margin: '8px' }} href={'/schools/?search='}>All Schools</a>
      {userContext.hasRegisteredSchool() && [
        <a style={{ margin: '8px' }} href={`/${userContext.get()?.school?.id}`}>My School</a>,
        <a style={{ margin: '8px' }} href={qaUnansweredPath}>Unanswered Inbox</a>
      ]}
      {!userContext.isLoggedIn() && [
        <a style={{ margin: '8px' }} href={loginPath}>Log In</a>,
        <a style={{ margin: '8px' }} href={signupPath}>Sign Up</a>
      ]}
      {userContext.isLoggedIn() &&
      <a style={{ margin: '8px' }} href={homePath} onClick={authAPI.logout}>
        Log Out
        ({userContext.isApplicantAccount() ? 'applicant' : 'school'}: {userContext.get()?.username})
      </a>}
    </div>
  );
};

export default HeaderMenu;

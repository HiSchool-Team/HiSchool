import React from 'react';
import userContext from '../context/User';
import authAPI from '../api/Auth';

const HeaderMenu = () => {
  return (
    <div style={{ textAlign: 'right' }}>
      <a style={{ margin: '8px' }} href={'/'}>Home</a>
      {userContext.isApplicantAccount() && [
        <a style={{ margin: '8px' }} href={'/user/savedSchools'}>Saved Schools</a>,
        <a style={{ margin: '8px' }} href={'/user/savedQAs/'}>Saved Questions</a>
      ]}
      <a style={{ margin: '8px' }} href={'/qa/admin/'}>Register School</a>
      <a style={{ margin: '8px' }} href={'/schools/?search='}>All Schools</a>
      {userContext.isSchoolAccount() && <a style={{ margin: '8px' }} href={'/qa/unanswered'}>Unanswered Inbox</a>}
      {!userContext.isLoggedIn() && [
        <a style={{ margin: '8px' }} href={'/logIn'}>Log In</a>,
        <a style={{ margin: '8px' }} href={'/signUp'}>Sign Up</a>
      ]}
      {userContext.isLoggedIn() && <a style={{ margin: '8px' }} href={'/'} onClick={authAPI.logout}>Log Out</a>}
    </div>
  );
};

export default HeaderMenu;

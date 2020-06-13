import React from 'react';
import { userIsApplicant, userIsLoggedIn, userIsSchool } from '../utils/utils'

const HeaderMenu = () => {
  return (
    <div style={{ textAlign: 'right' }}>
      <a style={{ margin: '8px' }} href={'/'}>Home</a>
      {userIsApplicant() && <a style={{ margin: '8px' }} href={'/user/savedSchools'}>Saved Schools</a>}
      {userIsApplicant() && <a style={{ margin: '8px' }} href={'/user/savedQAs/'}>Saved Questions</a>}
      <a style={{ margin: '8px' }} href={'/qa/admin/'}>Register School</a>
      <a style={{ margin: '8px' }} href={'/schools/?search='}>All Schools</a>
      {userIsSchool() && <a style={{ margin: '8px' }} href={'/qa/unanswered'}>Unanswered Inbox</a>}
      {!userIsLoggedIn() && <a style={{ margin: '8px' }} href={'/logIn'}>Log In</a>}
      {!userIsLoggedIn() && <a style={{ margin: '8px' }} href={'/signUp'}>Sign Up</a>}
      {userIsLoggedIn() && <a style={{ margin: '8px' }} href={'/'}>Log Out</a>} {/* TODO add functionality */}
    </div>
  );
};

export default HeaderMenu;

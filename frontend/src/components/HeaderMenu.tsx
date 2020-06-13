import React from 'react';

const HeaderMenu = () => {
  return (
    <div style={{ textAlign: 'right' }}>
      <a style={{ margin: '8px' }} href={'/'}>Home</a>
      {/* <a style={{ margin: '8px' }} href={'#My Profile'}>My Profile</a> */}
      <a style={{ margin: '8px' }} href={'/user/savedSchools'}>Saved Schools</a>
      <a style={{ margin: '8px' }} href={'/user/savedQAs/'}>Saved Questions</a>
      <a style={{ margin: '8px' }} href={'/qa/admin/'}>Register School</a>
      <a style={{ margin: '8px' }} href={'/schools/?search='}>All Schools</a>
      <a style={{ margin: '8px' }} href={'/qa/unanswered'}>Unanswered Inbox</a>
      <a style={{ margin: '8px' }} href={'/logIn'}>Log In</a>
      <a style={{ margin: '8px' }} href={'/signUp'}>Sign Up</a>
      {/* TODO enter option here for log out */}
      {/* <a style={{ margin: '8px' }} href={'/1/qa/admin/'}>Teacher View</a> */}
    </div>
  );
};

export default HeaderMenu;

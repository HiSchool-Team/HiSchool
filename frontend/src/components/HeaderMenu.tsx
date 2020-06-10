import React from 'react';

const HeaderMenu = () => {
  return (
    <div style={{ textAlign: 'right' }}>
      <a style={{ margin: '8px' }} href={'/'}>Home</a>
      <a style={{ margin: '8px' }} href={'#My Profile'}>My Profile</a>
      <a style={{ margin: '8px' }} href={'/user/savedSchools'}>Saved Schools</a>
      <a style={{ margin: '8px' }} href={'/user/savedQAs/'}>Saved Questions</a>
      <a style={{ margin: '8px' }} href={'/1/qa/admin/'}>Teacher View</a>
    </div>
  );
};

export default HeaderMenu;

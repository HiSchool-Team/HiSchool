import React from 'react';
import './FrontpageView.css';
import { Layout } from 'antd';

import './NewLayout.css';
import SearchBar from '../components/SearchBar';

const { Header, Content, Sider } = Layout;

const Frontpage = (props: {children: React.ReactNode, }) => {
  return (
    <div>
      <Header style={{ position: 'fixed', width: '100%', zIndex: 4 }} >
        <div className={'logo-title'}>WhichSchool?</div>
        <div style={{ textAlign: 'right' }}>
          <a style={{ margin: '8px' }} href={'/'}>Home</a>
          <a style={{ margin: '8px' }} href={'#MySchools'}>MySchools</a>
          <a style={{ margin: '8px' }} href={'#MyProfile'}>MyProfile</a>
        </div>
      </Header>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Content style={{ margin: '64px 30px 24px 30px', overflow: 'initial' }}>
          {props.children}
        </Content>
      </Layout>

      <body>
        <p className={'which-school'}>WhichSchool?</p>
        <p className={'search-title'}> Type the name of the school you wish to search</p>
      </body>
    </div>
  );
};

export default Frontpage;

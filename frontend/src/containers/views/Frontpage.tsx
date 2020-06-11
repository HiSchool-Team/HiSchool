import React, { SyntheticEvent } from 'react';

import '../NewLayout.css';
import './Frontpage.css';

import { Layout } from 'antd';
import SearchBar from '../../components/SearchBar';
import history from '../../utils/history';
import HeaderMenu from '../../components/HeaderMenu';

// TODO check if this import is needed

const { Header, Content, Sider } = Layout;

// TODO duplication
const handleEvent = (value: string, event?: SyntheticEvent) => {
  // https://stackoverflow.com/questions/42701129/how-to-push-to-history-in-react-router-v4
  history.push({
    pathname: '/schools/',
    search: `?${new URLSearchParams({ search: value })}`
  });
};

const Frontpage = (props: { children: React.ReactNode, }) => {
  return (
    <div>
      <Header style={{
        position: 'fixed',
        width: '100%',
        zIndex: 4
      }}>
        <div className={'logo-title'}>HiSchool</div>
        <HeaderMenu />
      </Header>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Content style={{
          margin: '0px 30px 24px 30px',
          overflow: 'initial'
        }}>
          {props.children}
        </Content>
      </Layout>

      <body>
        <p className="hi-school"> HiSchool</p>
        <p className="search-title"> Type the name of the school you wish to search
          <SearchBar handleSearch={handleEvent}/>
        </p>
      </body>
    </div>
  );
};

export default Frontpage;

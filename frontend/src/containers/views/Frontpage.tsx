import React, { SyntheticEvent } from 'react';

import '../NewLayout.css';
import './Frontpage.css';

import { Layout } from 'antd';
import SearchBar from '../../components/SearchBar';
import history from '../../utils/history';
import ActionButton from "antd/es/modal/ActionButton";
import TransButton from "antd/es/_util/transButton";
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
    <div className={"full-view"}>
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
        <div className={"spacer"}/>

        <body id={"centered-body"} className={"centered-body"}>
        <h1 className="hi-school"> HiSchool</h1>
        <div className={"search"}>
        <p className="search-title"> Search for a specific school
          <SearchBar handleSearch={handleEvent}/>
        </p>
        </div>

        <div className={"preference-search"}>
            <h1>Help me find a school</h1>
            <a href={`${window.location.href}pref`} className="help-button">Help me find a School</a>
        </div>
      </body>
    </div>
  );
};

export default Frontpage;

import React, {SyntheticEvent} from 'react';

import '../NewLayout.css';
import './Frontpage.css';

import {Layout} from 'antd';
import SearchBar from '../../components/SearchBar';
import history from '../../utils/history';
import ActionButton from "antd/es/modal/ActionButton";
import TransButton from "antd/es/_util/transButton";
import HeaderMenu from '../../components/HeaderMenu';

// TODO check if this import is needed

const {Header, Content, Sider} = Layout;

// TODO duplication
const handleEvent = (value: string, event?: SyntheticEvent) => {
    // https://stackoverflow.com/questions/42701129/how-to-push-to-history-in-react-router-v4
    history.push({
        pathname: '/schools/',
        search: `?${new URLSearchParams({search: value})}`
    });
};

const Frontpage = (props: { children: React.ReactNode, }) => {

    return (
        <body className={"full-view"}>
        <Header style={{
            position: 'fixed',
            width: '100%',
            zIndex: 4
        }}>
            <div className={'logo-title'}>HiSchool</div>
            <HeaderMenu/>
        </Header>
        <Layout className="site-layout" style={{marginLeft: 200}}>
            <Content style={{
                margin: '0px 30px 24px 30px',
                overflow: 'initial'
            }}>
                {props.children}
            </Content>
        </Layout>

        <body id={"centered-body"} className={"centered-body"}>
        <img className={"hi-school"} src="Logo.png" alt={"Logo"}/>
        <div className={"search"}>
            <h1 className="search-title"> Search for a specific school</h1>
                <SearchBar handleSearch={handleEvent}/>
        </div>

        <div className={"preference-search"}>
            <h1 className={"preference-title"}>Use my preferences for a more informed choice</h1>
            <a href={`${window.location.href}pref`} className="button">Help me find a School</a>
        </div>
        </body>
        </body>
    );
};

export default Frontpage;

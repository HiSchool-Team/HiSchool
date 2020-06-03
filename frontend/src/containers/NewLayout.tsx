import React, {Children, cloneElement, isValidElement, SyntheticEvent, useState} from "react";
import {Layout, Menu} from 'antd';
import myData from '../newData.json';

import './NewLayout.css';
import SearchBar from "../components/SearchBar";
import {RouteComponentProps} from "react-router-dom";
import SchoolList from "./SchoolListView";
import {School} from "../components/Schools";

import history from "../history";

const {Header, Content, Sider} = Layout;

interface LayoutState {
    schools: School[];
}

const NewLayout = (props: { children: React.ReactNode; }) => {
    const [schools, setSchools] = useState(myData);

    const handleEvent = (value: string, event?: SyntheticEvent) => {
        // https://stackoverflow.com/questions/42701129/how-to-push-to-history-in-react-router-v4
        history.push({
            pathname: '/list/',
            search: `?${new URLSearchParams({"search": value})}`
        })

        const axios = require('axios');
        console.log("I am here");

        axios.get('/api/', {
            params: {
                "search": value
            }
        }).then((resp: { data: School[]; }) => {
            console.log(resp.data);
            setSchools(resp.data);
        })
    }

    const childrenWithProps = Children.map(props.children, child => {
        if (isValidElement(child)) {
            return cloneElement(child, {schools: schools});
        }
        return child;
    })

    return (
        <div>
            <Layout>
                <Sider
                    style={{
                        marginTop: '64px',
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                    }}

                    width={"220px"}
                >

                    <div className="logo"/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} className="menu">
                        <Menu.Item key="1">
                            tags
                        </Menu.Item>
                        <Menu.Item key="2">
                            proximity
                        </Menu.Item>
                        <Menu.Item key="3">
                            user score
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Header style={{position: 'fixed', width: '100%', zIndex: 4}}>
                    <div className={"logo-title"}>WhichSchool?</div>
                    <div className={"search-bar"}>
                        <SearchBar handleSearch={handleEvent}/>
                    </div>
                    <div style={{textAlign: 'right'}}>
                        <a style={{margin: '8px'}} href={"/"}>Home</a>
                        <a style={{margin: '8px'}} href={"#MySchools"}>MySchools</a>
                        <a style={{margin: '8px'}} href={"#MyProfile"}>MyProfile</a>
                    </div>
                </Header>
                <Layout className="site-layout" style={{marginLeft: 200}}>
                    <Content style={{margin: '64px 30px 24px 30px', overflow: 'initial'}}>
                        {childrenWithProps}
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}


// class NewLayout extends React.Component<RouteComponentProps, LayoutState> {
//     constructor(props: RouteComponentProps) {
//         super(props);
//
//         this.handleEvent = this.handleEvent.bind(this);
//
//         this.state = {
//             schools: myData
//         }
//     }
//
//
//     handleEvent(value: string, event?: SyntheticEvent) {
//
//
//
//     }
// }

export default NewLayout;
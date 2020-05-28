import React from "react";
import {Layout, Menu} from 'antd';
import Search from "antd/lib/input/Search";
import  './NewLayout.css';

const {Header, Content, Sider} = Layout;

const NewLayout = (props: { children: React.ReactNode; }) => {
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
                >

                    <div className="logo"/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                        <Menu.Item key="1" >
                            tags
                        </Menu.Item>
                        <Menu.Item key="2" >
                            proximity
                        </Menu.Item>
                        <Menu.Item key="3" >
                            user score
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Header style={{position: 'fixed', width: '100%', zIndex: 4}} >
                    <div className={"search-bar"}>
                        <Search placeholder="search by school name" onSearch={(value: string) => console.log(value)} enterButton />
                    </div>
                    <div style={{textAlign: 'right'}}>
                        <a style={{margin: '8px'}} href={"/"}>Home</a>
                        <a style={{margin: '8px'}} href={"#MySchools"}>MySchools</a>
                        <a style={{margin: '8px'}} href={"#MyProfile"}>MyProfile</a>
                    </div>
                </Header>
                <Layout className="site-layout" style={{marginLeft: 200}}>
                    <Content style={{margin: '64px 30px 24px 30px', overflow: 'initial'}}>
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default NewLayout;
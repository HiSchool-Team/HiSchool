import React, {Children, cloneElement, isValidElement, SyntheticEvent, useEffect, useState} from 'react';
import {Layout, Menu} from 'antd';
import myData from '../newData.json';
import './NewLayout.css';
import history from '../history';
import SearchBar from '../components/SearchBar';
import {School} from '../types';
import Schools from '../components/Schools';
import {RouteComponentProps} from 'react-router-dom';
import SubMenu from 'antd/lib/menu/SubMenu';

const {Header, Content, Sider} = Layout;

const tags = ['football', 'rugby', 'cricket', 'swimming']

const NewLayout = (props: { children: React.ReactNode, route: RouteComponentProps, }) => {
  const [schools, setSchools] = useState();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    console.log('New layout has mounted');

    const searchResult = getSearchResult();
    console.log(searchResult);

    updateDataIfSchoolList(searchResult);
  }, [props]);

  const getSearchResult = () => {
    const qs = require('qs');
    const queryParams = qs.parse(props.route.location.search, {ignoreQueryPrefix: true});
    return queryParams.search;
  };

  const updateDataIfSchoolList = (value: string) => {
    const schoolList = Boolean(Children.map(props.children, child => {
      return isValidElement(child) && child.type === Schools;
    })?.reduce((a, b) => a || b));

    // only get data if we are dealing with a school list
    if (schoolList) {
      const axios = require('axios');

      axios.get('/app/api/search/', {
        params: {
          search: value
        }
      }).then((resp: { data: School[], }) => {
        console.log(resp.data);
        const newData = resp.data.map(school => (
          {
            ...school,
            img_src: `/static/media/${school.img_src}`
          })
        );
        console.log(newData);
        setSchools(newData);
      });
    }
  };

  const handleEvent = (value: string, event?: SyntheticEvent) => {
    // https://stackoverflow.com/questions/42701129/how-to-push-to-history-in-react-router-v4
    history.push({
      pathname: '/schools/',
      search: `?${new URLSearchParams({search: value})}`
    });

    updateDataIfSchoolList(value);
  };

  // TODO see if there is a better way
  const childrenWithProps = Children.map(props.children, child => {
    if (isValidElement(child)) {
      return cloneElement(child, {data: schools});
    }
    return child;
  });

  return (
    <div>
      <Layout>
        <Sider
          style={{
            marginTop: '64px',
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0
          }}

          width={'220px'}
        >

          <div className="logo"/>
          <Menu theme="dark" mode="inline" className="menu" multiple={true}
                onSelect={(x) => {
                  setSelectedTags([...selectedTags, x.key])
                }}
                onDeselect={(x) => {
                  setSelectedTags(selectedTags.filter(key => key !== x.key))
                }}
                selectedKeys={selectedTags}>
            <SubMenu key={"1"} title={"tags"}>
              {tags.map(elem => {
                return <Menu.Item key={elem}>{elem}</Menu.Item>
              })}
            </SubMenu>
            <SubMenu key={"2"} title={"proximity"} disabled={true}/>
            <SubMenu key={"3"} title={"user score"} disabled={true}/>
          </Menu>
        </Sider>
        <Header style={{
          position: 'fixed',
          width: '100%',
          zIndex: 4
        }}>
          <div className={'logo-title'}>HiSchool</div>
          <div className={'search-bar'}>
            <SearchBar handleSearch={handleEvent}/>
          </div>
          <div style={{textAlign: 'right'}}>
            <a style={{margin: '8px'}} href={'/'}>Home</a>
            <a style={{margin: '8px'}} href={'#MySchools'}>MySchools</a>
            <a style={{margin: '8px'}} href={'#MyProfile'}>MyProfile</a>
            <a style={{margin: '8px'}} href={'/7/qa/'}>Questions&Answers</a>
            <a style={{margin: '8px'}} href={'/7/qa/admin/'}>Teacher View</a>
          </div>
        </Header>
        <Layout className="site-layout" style={{marginLeft: 200}}>
          <Content style={{
            margin: '64px 30px 24px 30px',
            overflow: 'initial'
          }}>
            {childrenWithProps}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default NewLayout;

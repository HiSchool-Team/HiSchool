import React, {useEffect, useState} from 'react';
import {Layout, Menu} from 'antd';
import './NewLayout.css';
import SearchBar from '../components/SearchBar';
import SubMenu from 'antd/lib/menu/SubMenu';
import {goToNewUrl} from '../utils/utils';
import {Tag} from '../types';

const {Header, Content, Sider} = Layout;

// const tags = ['football', 'rugby', 'cricket', 'swimming'];

const NewLayout = (props: {
  updateDisplayedSchool?: (selectedTags: number[]) => void,
  tags?: Tag[],
  children: React.ReactNode,
  searchClick?: (value: string) => void,
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagTypes, setTagTypes] = useState<Set<string>>(new Set());

  useEffect(() => {
    const newTypes = new Set<string>(tagTypes);
    props.tags?.forEach(tag => {
      newTypes.add(tag.type);
    })
    setTagTypes(newTypes);
  }, [props.tags])

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
                  setSelectedTags([...selectedTags, x.key]);
                  props.updateDisplayedSchool?.(selectedTags.map(tag => parseInt(tag)));
                }}
                onDeselect={(x) => {
                  setSelectedTags(selectedTags.filter(key => key !== x.key));
                  props.updateDisplayedSchool?.(selectedTags.map(tag => parseInt(tag)));
                }}
                selectedKeys={selectedTags}>

            {Array.from(tagTypes).map(type => {
              return <SubMenu title={type}>
                {props.tags?.map(tag => {
                  if (type === tag.type) {
                    return <Menu.Item key={tag.id}>{tag.name}</Menu.Item>
                  }
                })}
              </SubMenu>
            })}
          </Menu>
        </Sider>
        <Header style={{
          position: 'fixed',
          width: '100%',
          zIndex: 4
        }}>
          <div className={'logo-title'}>HiSchool</div>
          <div className={'search-bar'}>
            <SearchBar handleSearch={(value: string) => {
              goToNewUrl('/schools/', {search: value});
              props.searchClick?.(value); // optional call
            }}/>
          </div>
          <div style={{textAlign: 'right'}}>
            <a style={{margin: '8px'}} href={'/'}>Home</a>
            <a style={{margin: '8px'}} href={'/savedSchools'}>My Schools</a>
            <a style={{margin: '8px'}} href={'#My Profile'}>My Profile</a>
            <a style={{margin: '8px'}} href={'/7/qa/'}>Questions&Answers</a>
            <a style={{margin: '8px'}} href={'/7/qa/admin/'}>Teacher View</a>
          </div>
        </Header>
        <Layout className="site-layout" style={{marginLeft: 200}}>
          <Content style={{
            margin: '64px 30px 24px 30px',
            overflow: 'initial'
          }}>
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default NewLayout;

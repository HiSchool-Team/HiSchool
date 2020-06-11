import React, {useEffect, useState} from 'react';
import {Layout, Menu} from 'antd';
import SearchBar from '../components/SearchBar';
import SubMenu from 'antd/lib/menu/SubMenu';
import {goToNewUrl} from '../utils/utils';
import {Tag} from '../types';
import {schoolListBasePath} from "./views/SchoolList";

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
    setTagTypes(prevTagTypes => {
      const newTypes = new Set<string>(prevTagTypes);
      props.tags?.forEach(tag => {
        newTypes.add(tag.type);
      })
      return newTypes;
    });
  }, [props.tags])

  const updateDisplayedSchools = (newSelectedTags: string[]): void => {
    setSelectedTags(newSelectedTags);
    props.updateDisplayedSchool?.(newSelectedTags.map(tag => parseInt(tag)));
  }

  return (
    <div>
      <Layout>
        <Header style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "center",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <div style={{
              width: "10%",
              textAlign: "center",
              color: "white",
              fontSize: "22pt",
            }}>HiSchool
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "30px",
            }}>
              <SearchBar handleSearch={(value: string) => {
                goToNewUrl(schoolListBasePath, {search: value});
                props.searchClick?.(value); // optional call
              }}/>
            </div>
          </div>
          <div style={{
            display: "inline-block",
          }}>
            <a style={{paddingInline: "5px"}} href={'/'}>Home</a>
            <a style={{paddingInline: "5px"}} href={'/savedSchools'}>My Schools</a>
            <a style={{paddingInline: "5px"}} href={'#My Profile'}>My Profile</a>
            <a style={{paddingInline: "5px"}} href={'/7/qa/'}>Questions&Answers</a>
            <a style={{paddingInline: "5px"}} href={'/7/qa/admin/'}>Teacher View</a>
          </div>
        </Header>

        <Layout>
          <Sider width={"10%"}>
            <div className="logo"/>
            <Menu theme="dark" mode="inline" className="menu" multiple={true}
                  onSelect={(x) => {
                    updateDisplayedSchools([...selectedTags, x.key]);
                  }}
                  onDeselect={(x) => {
                    updateDisplayedSchools(selectedTags.filter(key => key !== x.key));
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
          <Content>
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default NewLayout;

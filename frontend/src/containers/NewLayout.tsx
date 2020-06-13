import React, { useEffect, useState } from 'react';
import { Layout, Menu, InputNumber } from 'antd';
import './NewLayout.css';
import SearchBar from '../components/SearchBar';
import SubMenu from 'antd/lib/menu/SubMenu';
import { goToNewUrl } from '../utils/utils';
import { Tag } from '../types';
import { schoolListBasePath } from './views/SchoolList';
import HeaderMenu from '../components/HeaderMenu';

const { Header, Content, Sider } = Layout;

// const tags = ['football', 'rugby', 'cricket', 'swimming'];

const NewLayout = (props: {
  updateDisplayedSchool?: (selectedTags: number[]) => void,
  tags?: Tag[],
  children: React.ReactNode,
  searchClick?: (value: string) => void,
}) => {
  const defaultDistance = 20;
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagTypes, setTagTypes] = useState<Set<string>>(new Set());
  const [distance, setDistance] = useState<number>(defaultDistance);

  useEffect(() => {
    setTagTypes(prevTagTypes => {
      const newTypes = new Set<string>(prevTagTypes);
      if (props.tags) {
        for (const tag of props.tags) {
          newTypes.add(tag.type);
        }
      }
      return newTypes;
    });
  }, [props.tags]);

  const updateDisplayedSchools = (newSelectedTags: string[]): void => {
    setSelectedTags(newSelectedTags);
    props.updateDisplayedSchool?.(newSelectedTags.map(tag => parseInt(tag)));
  };

  return (
    <div>
      <Layout>
        <Header style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'center',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              textAlign: 'center',
              color: 'white',
              fontSize: '22pt'
            }}>HiSchool
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '30px'
            }}>
              <SearchBar handleSearch={(value: string) => {
                goToNewUrl(schoolListBasePath, { search: value });
                props.searchClick?.(value); // optional call
              }}/>
            </div>
          </div>
          <HeaderMenu/>
        </Header>

        <Layout>
          <Sider width={'10%'}>
            <div className="logo"/>
            <div style={{
              color: 'white',
              marginLeft: '10px',
              display: 'flex',
              alignItems: 'center'
            }}>
              General Fields:
            </div>
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
                      return <Menu.Item key={tag.id}>{tag.name}</Menu.Item>;
                    }
                  })}
                </SubMenu>;
              })}
            </Menu>
            <div style={{
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'space-between'
            }}>
              <div style={{
                color: 'white',
                marginLeft: '10px',
                display: 'flex',
                alignItems: 'center'
              }}>
                Distance:
              </div>
              <InputNumber style={{ marginRight: '10px' }}
                defaultValue={defaultDistance}
                formatter={value => `${value} km`}
                parser={value => {
                  if (value) {
                    return parseInt(value.replace(' ', '').replace('km', ''));
                  }
                  return defaultDistance;
                }}
                onChange={(value => {
                  if (typeof value === 'number') {
                    setDistance(value);
                  }
                })}/>
            </div>
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

import React from 'react';
import { Card, List, Space } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import './Schools.css';
import { School } from '../types';
import { v1 as uuidv4 } from 'uuid';

// @ts-ignore
const RepeatIcon = ({ label, icon, times }) => {
  const icons = [];
  for (let i = 0; i < times; i++) {
    icons.push(<div>{React.createElement(icon)}</div>);
  }

  return (
    <div style={{
      display: 'block',
      textAlign: 'right',
      transform: 'scale(1.2)',
      marginLeft: '200px'
    }}>
      <Space><b>{label}</b>{icons}</Space>
    </div>
  );
};

const Schools = (props: { data: School[] | undefined }) => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={props.data}
      renderItem={(item: School) => (
        <Card>
          <List.Item key={uuidv4()}>
            <List.Item.Meta title={<a href={`/${item.id}`}><b>{item.name}</b></a>}/>

            <div>
              <div className={'school-picture'}><img alt="logo" src={item.img_src}/></div>
              <div className={'school-description'}><p>{item.description}</p></div>
              <div className={'satisfaction-levels'}>
                <RepeatIcon label={'Student satisfaction'} icon={StarOutlined} times={5}/>
                <RepeatIcon label={'Parent satisfaction'} icon={StarOutlined} times={5}/>
                <RepeatIcon label={'Extracurriculars'} icon={StarOutlined} times={5}/>
              </div>
            </div>
          </List.Item>
        </Card>
      )}
    />
  );
};

export default Schools;

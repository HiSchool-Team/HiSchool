import React from 'react';
import { Card, List, Space } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import './Schools.css';
import { School } from '../types';

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis tellus justo. Vestibulum vestibulum turpis vel elit lacinia accumsan. Proin accumsan, purus nec congue lacinia, nisl nibh porttitor nunc, eget sagittis tellus metus vitae quam. Donec in porta dui. In hac habitasse platea dictumst. Curabitur id maximus purus, in commodo tellus. Ut orci purus, sagittis quis vulputate sit amet, pulvinar sit amet enim. Curabitur sit amet malesuada sem. Donec cursus ex eget turpis egestas, at tincidunt neque convallis. Maecenas dictum erat dui, et consectetur lorem convallis et.';

// @ts-ignore
const RepeatIcon = ({ label, icon, times }) => {
  const icons = [];
  for (let i = 0; i < times; i++) {
    // @ts-ignore
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

const Schools = (props: { data: School[], }) => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={props.data}
      renderItem={(item: School) => (
        <Card>
          <List.Item>
            <List.Item.Meta title={<a href={`/${item.id}`}><b>{item.name}</b></a>}/>

            <div>
              <div className={'school-picture'}><img alt="logo" src={item.img_src}/></div>
              <div className={'school-description'}><p>{loremIpsum}</p></div>
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

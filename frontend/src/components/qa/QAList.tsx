import React from 'react';
import { QA } from './QA';
import { Card, List } from 'antd';
import { Question } from '../../types';

export const QAList = (props: {data: Question[], }) => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={props.data}
      renderItem={(item: Question) => <Card><QA question={item}/></Card>}
    />
  );
};

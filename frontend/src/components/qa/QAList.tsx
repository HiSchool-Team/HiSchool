import React from 'react';
import { QA } from './QA';
import { Card, List } from 'antd';
import { Question } from '../../types';

type Props = {
  data: Question[],
  answerable: boolean,
};

const QAList = ({ data, answerable }: Props) => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={data}
      renderItem={(item: Question) => <Card><QA question={item} answerable={answerable}/></Card>}
    />
  );
};

QAList.defaultProps = {
  answerable: false
};

export default QAList;

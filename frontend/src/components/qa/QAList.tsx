import React from 'react';
import QAItem from './QAItem';
import { Card, List } from 'antd';
import { QA, Question } from '../../types';

type Props = {
  qas: QA[],
  answerable: boolean,
};

export const QAList = ({ qas, answerable }: Props) => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={qas}
      renderItem={(qa: QA) => <Card><QAItem qa={qa} answerable={answerable}/></Card>
      }
    />
  );
};

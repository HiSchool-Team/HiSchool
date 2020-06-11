import React from 'react';
import QAItem from './QAItem';
import { Card, List } from 'antd';
import { QA, Question } from '../../types';

type Props = {
  qas: QA[],
  isAnswerable: boolean,
};

export const QAList = ({ qas, isAnswerable }: Props) => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={qas}
      renderItem={(qa: QA) => <Card><QAItem qa={qa} isAnswerable={isAnswerable}/></Card>
      }
    />
  );
};

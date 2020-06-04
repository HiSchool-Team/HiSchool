import React from 'react';
import QAItem from './QAItem';
import { Card, List } from 'antd';
import { QA, Question } from '../../types';
import { QAUpdater } from '../../containers/views/qa/QAUser';

type Props = {
  qas: QA[],
  answerable: boolean,
};

function zip<A, B> (arr1: A[], arr2: B[]): [A, B][] {
  return arr1.map((k, i) => [k, arr2[i]]);
}

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

import React, { useEffect, useState } from 'react';
import { QA } from '../../../types';
import AskBar from '../../../components/qa/AskBar';
import { Button, Card } from 'antd';
import { QAList } from '../../../components/qa/QAList';
import NewLayout from '../../NewLayout';
import userAPI from '../../../api/UserAPI';

const testQuestions: QA[] = [
  {
    id: 0,
    question: {
      title: 'qa title',
      body: 'qa body'
    },
    answer: undefined
  }
];

const SavedQAs = () => {
  const [qas, setQAs] = useState(new Array<QA>());
  useEffect(() => {
    userAPI.getSavedQAs().then(qas => setQAs(qas));
  }, []);

  return (
    <NewLayout>
      <Card>
        <Button href='savedSchools'>My Schools</Button>
        <QAList qas={qas} answerable={false}/>
      </Card>
    </NewLayout>
  );
};

export default SavedQAs;

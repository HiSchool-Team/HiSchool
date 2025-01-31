import React, { useEffect, useState } from 'react';
import { QA } from '../../../types';
import AskBar from '../../../components/qa/AskBar';
import { Button, Card } from 'antd';
import { QAList } from '../../../components/qa/QAList';
import NewLayout from '../../NewLayout';
import applicantAccountAPI from '../../../api/ApplicantAccount';

const testQuestions: QA[] = [
  {
    id: 0,
    recipient_school_id: 1,
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
    applicantAccountAPI.getSavedQAs().then(qas => setQAs(qas));
  }, []);

  return (
    <NewLayout>
      <Card>
        <QAList qas={qas} isAnswerable={false}/>
      </Card>
    </NewLayout>
  );
};

export default SavedQAs;

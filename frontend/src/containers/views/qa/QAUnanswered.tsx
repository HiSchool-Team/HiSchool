import React, { useEffect, useState } from 'react';
import { QA } from '../../../types';
import qaAPI from '../../../api/QA';
import NewLayout from '../../NewLayout';
import { Card } from 'antd';
import { QAList } from '../../../components/qa/QAList';
import userContext from '../../../context/User';
import useInterval from 'use-interval';

const QAUnanswered: React.FC = () => {
  const [qas, setQas] = useState(new Array<QA>());

  useInterval(() => {
    qaAPI.getAllUnanswered().then(qas => setQas(qas.filter(qa => qa.recipient_school_id === userContext.getSchoolId())));
  }, 1000, true);

  return (
    <NewLayout>
      <div>
        <Card>
          <h2>Unanswered Questions</h2>
          <QAList qas={qas} isAnswerable />
        </Card>
      </div>
    </NewLayout>
  );
};

export default QAUnanswered;

import React, { useEffect, useState } from 'react';
import { QA } from '../../../types';
import qaAPI from '../../../api/QA';
import NewLayout from '../../NewLayout';
import { Card } from 'antd';
import { QAList } from '../../../components/qa/QAList';

const QAUnanswered: React.FC = () => {
  const [qas, setQas] = useState(new Array<QA>());

  useEffect(() => {
    qaAPI.getAllUnanswered().then(setQas);
  }, []);

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

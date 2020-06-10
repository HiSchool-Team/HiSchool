import React, { useEffect, useState } from 'react';
import { QA, Question, School } from '../../types';
import AskBar from '../../components/qa/AskBar';
import { Card } from 'antd';
import { QAList } from '../../components/qa/QAList';
import NewLayout from '../NewLayout';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { fetchAllQAs, fetchQAs } from '../../api/QA';

type Props = {
  isAdmin: boolean,
};

const QAView: React.FC<Props> = ({ isAdmin }) => {
  const [qas, setQas] = useState(new Array<QA>());
  const { schoolID } = useParams();
  const schoolId: number = parseInt(schoolID);
  console.log(`schoolID: ${schoolID}, parsed schoolId: ${schoolId}`);

  useEffect(() => {
    fetchQAs(schoolId).then(fetchedQas => fetchedQas && setQas(fetchedQas));
  }, [schoolId]);

  console.log('Rerendering QAView with qas');
  console.log(qas);

  const view = (

    <NewLayout>
      <div>
        <Card>
          {!isAdmin && <AskBar />}
          <QAList qas={qas} answerable={isAdmin}/>
        </Card>
      </div>
    </NewLayout>
  );

  return view;
};

export default QAView;

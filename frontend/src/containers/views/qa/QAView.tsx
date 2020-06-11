import React, { useEffect, useState } from 'react';
import { QA } from '../../../types';
import AskBar from '../../../components/qa/AskBar';
import { Button, Card } from 'antd';
import { QAList } from '../../../components/qa/QAList';
import NewLayout from '../../NewLayout';
import { useParams } from 'react-router-dom';
import qaAPI from '../../../api/QA';

type Props = {
  isAdmin: boolean,
};

const QAView: React.FC<Props> = ({ isAdmin }) => {
  const [qas, setQas] = useState(new Array<QA>());
  const { schoolID } = useParams();
  const schoolId: number = parseInt(schoolID);
  console.log(`schoolID: ${schoolID}, parsed schoolId: ${schoolId}`);

  useEffect(() => {
    qaAPI
      .getAddressedTo(schoolId)
      .then(fetchedQas => fetchedQas && setQas(fetchedQas));
  }, [schoolId]);

  console.log('Rerendering QAView with qas');
  console.log(qas);

  const view = (

    <NewLayout>
      <div>
        <Card>
          {isAdmin
            ? <Button><a href={`/${schoolId}/qa/`}>User View</a></Button>
            : <Button><a href={`/${schoolId}/qa/admin/`}>School View</a></Button>}
          {!isAdmin && <AskBar recipientSchoolId={schoolId}/>}
          <QAList qas={qas} isAnswerable={isAdmin}/>
        </Card>
      </div>
    </NewLayout>
  );

  return view;
};

export default QAView;

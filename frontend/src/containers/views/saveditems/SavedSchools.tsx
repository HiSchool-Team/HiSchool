import { School } from '../../../types';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import NewLayout from '../../NewLayout';
import Schools from '../../../components/Schools';
import { Button, Card } from 'antd';
import user from '../../../api/user';

type State = {
  schools: School[],
};

const testSavedSchools: School[] = [
  {
    id: 0,
    name: 'name',
    description: 'description',
    student_satisfaction: 1,
    parent_satisfaction: 1,
    img_src: 'N/A'
  }
];

const SavedSchools: React.FC = () => {
  const [schools, setSchools] = useState(new Array<School>());

  useEffect(() => {
    user.getSavedSchools().then(schools => setSchools(schools));
  }, []);

  return (
    <NewLayout>
      <Card>
        <Button href='savedQAs'>My Questions</Button>
        <Schools data={schools}/>
      </Card>
    </NewLayout>
  );
};

export default SavedSchools;

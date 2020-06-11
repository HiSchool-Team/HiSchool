import { School } from '../../../types';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import NewLayout from '../../NewLayout';
import Schools from '../../../components/Schools';
import { Button, Card } from 'antd';
import userAPI from '../../../api/UserAPI';

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
    img_src: 'N/A',
    tags: new Set<number>()
  }
];

const SavedSchools: React.FC = () => {
  const [schools, setSchools] = useState(new Array<School>());

  useEffect(() => {
    userAPI.getSavedSchools().then(schools => setSchools(schools));
  }, []);

  return (
    <NewLayout>
      <Card>
        <Schools data={schools}/>
      </Card>
    </NewLayout>
  );
};

export default SavedSchools;

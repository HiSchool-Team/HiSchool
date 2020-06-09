import { School } from '../../../types';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import NewLayout from '../../NewLayout';
import Schools from '../../../components/Schools';
import { Button } from 'antd';

type State = {
  schools: School[],
};

const savedSchools: School[] = [
  {
    id: 0,
    name: 'name',
    description: 'description',
    student_satisfaction: 1,
    parent_satisfaction: 1,
    img_src: 'N/A'
  }
];

class SavedSchools extends React.Component<RouteComponentProps, State> {
  state = {
    schools: savedSchools
  };

  componentDidMount () {
    // TODO fill this properly
  }

  render () {
    return (
      <NewLayout>
        <Button>My Questions</Button>
        <Schools data={this.state.schools}/>
      </NewLayout>
    );
  }
}

export default SavedSchools;

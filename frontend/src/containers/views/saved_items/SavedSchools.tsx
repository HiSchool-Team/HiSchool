import { QA, School } from '../../../types';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import NewLayout from '../../NewLayout';
import Schools from '../../../components/Schools';
import { fetchQAs } from '../../../api';
import { Button } from 'antd';

type State = {
  schools: School[],
};

const testSchools: School[] = [
  {
    id: 0,
    name: 'test school',
    description: 'come here to learn how TODO',
    student_satisfaction: 0,
    parent_satisfaction: 0,
    img_src: 'nopath'
  }
];

class SavedSchools extends React.Component<RouteComponentProps, State> {
  state = {
    schools: testSchools
  };

  componentDidMount () {
    // TODO fill this properly
  }

  render () {
    return (
      <NewLayout route={{
        history: this.props.history,
        location: this.props.location,
        match: this.props.match,
        staticContext: this.props.staticContext
      }}>
        <Button>Test Button</Button>
        {console.log('*\n*\n')}
        {console.log(this.state.schools[0].description)}
        <Schools data={this.state.schools}/>
      </NewLayout>
    );
  }
}

export default SavedSchools;

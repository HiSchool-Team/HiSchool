import {School } from '../../../types';
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
      <NewLayout route={{
        history: this.props.history,
        location: this.props.location,
        match: this.props.match,
        staticContext: this.props.staticContext
      }}>
        <Button>My Questions</Button>
        {console.log(this.state.schools)}
        <Schools data={this.state.schools}/>
      </NewLayout>
    );
  }
}

export default SavedSchools;

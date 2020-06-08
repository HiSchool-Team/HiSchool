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

class SavedSchools extends React.Component<RouteComponentProps, State> {
  state = {
    schools: []
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
        {console.log(this.state.schools.length)}
        <Schools data={this.state.schools}/>
      </NewLayout>
    );
  }
}

export default SavedSchools;

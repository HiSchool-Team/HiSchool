import React from 'react';

import Schools from '../../components/Schools';
import { School } from '../../types';
import NewLayout from '../NewLayout';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
    schools: School[],
}

class SchoolList extends React.Component<Props> {
  constructor (props: Props) {
    super(props);
  }

  render () {
    return (
    // TODO check how route can be directly provided by Route. Change for every component implemented this way
      <NewLayout route={{
        history: this.props.history,
        location: this.props.location,
        match: this.props.match,
        staticContext: this.props.staticContext
      }}>
        <Schools data={this.props.schools}/>
      </NewLayout>
    );
  }
}

export default SchoolList;

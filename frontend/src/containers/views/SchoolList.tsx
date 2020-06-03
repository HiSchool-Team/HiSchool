import React from 'react';
import myData from '../../data.json';

import Schools from '../../components/Schools';
import { School } from '../../types';
import NewLayout from '../NewLayout';

type Props = {
  schools: School[],
};

class SchoolList extends React.Component<Props> {
  constructor (props: Props) {
    super(props);
    this.state = {
      schools: myData
    };
  }

  render () {
    return (
      <NewLayout>
        <Schools data={this.props.schools}/>
      </NewLayout>
    );
  }
}

export default SchoolList;

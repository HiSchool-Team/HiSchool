import React from 'react';
import myData from '../../data.json';

import Schools from '../../components/Schools';
import { School } from '../../types';

interface SchoolListProps {
  schools: School[],
}

class SchoolList extends React.Component<SchoolListProps> {
  constructor (props: SchoolListProps) {
    super(props);
    this.state = {
      schools: myData
    };
  }

  render () {
    return (
      <Schools data={this.props.schools}/>
    );
  }
}

export default SchoolList;

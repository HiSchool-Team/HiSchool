import React from 'react'
import myData from '../data.json'

import Schools from '../components/Schools'

class SchoolList extends React.Component {
    state = {
      schools: myData
    }

    componentDidMount () {

    }

    render () {
      return (
        <Schools data={this.state.schools}/>
      )
    }
}

export default SchoolList

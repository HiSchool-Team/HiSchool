import React from 'react';

import { Card } from 'antd';
import myData from '../../data.json';
import NewLayout from '../NewLayout';

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis tellus justo. Vestibulum vestibulum turpis vel elit lacinia accumsan. Proin accumsan, purus nec congue lacinia, nisl nibh porttitor nunc, eget sagittis tellus metus vitae quam. Donec in porta dui. In hac habitasse platea dictumst. Curabitur id maximus purus, in commodo tellus. Ut orci purus, sagittis quis vulputate sit amet, pulvinar sit amet enim. Curabitur sit amet malesuada sem. Donec cursus ex eget turpis egestas, at tincidunt neque convallis. Maecenas dictum erat dui, et consectetur lorem convallis et.';

class SchoolDetail extends React.Component {
  // @ts-ignore
  state = {
    school: {
      name: 'unset_name',
      img_src: 'no_src'
    }
  };

  componentDidMount () {
    // @ts-ignore
    const schoolID = parseInt(this.props.match.params.schoolID, 10);
    let correctSchool = myData[0];
    for (let i = 0; i < myData.length; i++) {
      if (myData[i].id === schoolID) {
        correctSchool = myData[i];
      }
    }

    this.setState({
      school: correctSchool
    });
  }

  render () {
    // @ts-ignore
    return (
      <NewLayout>
        <Card title={this.state.school.name}>
          <div className={'school-picture'}><img alt="logo" src={this.state.school.img_src}/></div>
          <div className={'school-description'}><p>{loremIpsum}</p></div>
        </Card>
      </NewLayout>
    );
  }
}

export default SchoolDetail;

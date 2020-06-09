import React from 'react';

import { Card, Col, Row } from 'antd';
import myData from '../../newData.json';
import NewLayout from '../NewLayout';
import { RouteComponentProps } from 'react-router-dom';
import './SchoolDetail.css';
import Paragraph from 'antd/es/typography/Paragraph';
import { StarOutlined } from '@ant-design/icons';

class SchoolDetail extends React.Component<RouteComponentProps> {
  state = {
    school: {
      name: 'unset_name',
      description: 'unset_description',
      img_src: 'no_src'
    }
  };

  savedIcon () {
    // TODO add retrieval of information based on user account
    // and add <StarFilled /> return
    return <StarOutlined style={{ fontSize: '2.71vw' }} onClick={e => this.changeSavedIcon()}/>;
  }

  changeSavedIcon () {
    // TODO cause change of saved status for user account
  }

  componentDidMount () {
    const correctSchool = myData[0];

    this.setState({
      school: correctSchool
    });
  }

  render () {
    return (
      <NewLayout route={{
        history: this.props.history,
        location: this.props.location,
        match: this.props.match,
        staticContext: this.props.staticContext
      }}>
        <Card title={this.state.school.name}>
          <Row>
            <Col span={16}>
              <Paragraph>
                {this.state.school.description}
              </Paragraph>
            </Col>
            <Col span={1}/>
            <Col span={2}>
              <a href="https://www.wizardingworld.com/">Website</a><br/>
              <a href="https://www.google.com">Twitter</a><br/>
              <a href="https://www.facebook.com/wizardingworld/">Facebook</a><br/>
            </Col>
            <Col span={5}>
              <img className={'school-picture'} alt="" src={this.state.school.img_src}/>
            </Col>
          </Row>
          <Row>
            <Col span={2}>
              <Paragraph strong style={{ fontSize: 'large' }}>School Motto:</Paragraph>
            </Col>
            <Col span={22}>
              <Paragraph style={{
                fontSize: 'large',
                fontStyle: 'italic'
              }}>
                Draco Dormiens Numquam Titillandus
              </Paragraph>
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <a className={'qa-link'} style={{ float: 'left' }}
                href={`${window.location.href}/qa`}>Questions & Answers </a>
            </Col>
            <Col span={1}/>
            <Col span={20}>
              {this.savedIcon()}
            </Col>
          </Row>
        </Card>

        <table>
          <tr>
            <th className={'school-tour'}>
              <h1>School tour</h1>
              <iframe width="420" height="315"
                src="https://www.youtube.com/embed/TtNWXCwDs7o">
              </iframe>
            </th>
            <th className={'tag-fields'}>
              <table className={'new-table'}>
                <tr>
                  <th style={{ textAlign: 'center' }}>Type</th>
                </tr>
                <tr>
                  <th className={'pill'}>Public School</th>
                  <th className={'pill'}>Boarding School</th>
                </tr>
                <tr>
                  <th style={{ textAlign: 'center' }}>Extracurricular</th>
                </tr>
                <tr>
                  <th className={'pill'}>Dueling Club</th>
                  <th className={'pill'}>Quidditch</th>
                  <th className={'pill'}>Charms Club</th>
                  <th className={'pill'}>Potions Club</th>
                  <th className={'pill'}>Astronomy Club</th>
                </tr>
                <tr>
                  <th style={{ textAlign: 'center' }}>Amenities</th>
                </tr>
                <tr>
                  <th className={'pill'}>Quidditch pitch</th>
                  <th className={'pill'}>Flying Grounds</th>
                  <th className={'pill'}>Hospital Wing</th>
                  <th className={'pill'}>Dining Hall</th>
                </tr>
                <tr>
                  <th style={{ textAlign: 'center' }}>Other</th>
                </tr>
                <tr className={'pill'}>Triwizard Tournament</tr>
              </table>
            </th>
            <th className={'misc'}>
              <iframe
                src="https://calendar.google.com/calendar/embed?src=0dmsr8gecd94i4sjrdq18j96j4%40group.calendar.google.com&ctz=Europe%2FLondon"
                width="300" height="200" frameBorder="0" scrolling="no"/>
              <br/>

              <iframe src="http://maps.google.com/maps?q=56.207862,-2.803599&z=15&output=embed"></iframe>
            </th>
          </tr>
        </table>
      </NewLayout>
    );
  }
}

export default SchoolDetail;

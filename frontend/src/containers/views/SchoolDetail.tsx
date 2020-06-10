import React from 'react';

import { Card, Col, Row } from 'antd';
import myData from '../../newData.json';
import NewLayout from '../NewLayout';
import { RouteComponentProps } from 'react-router-dom';
import './SchoolDetail.css';
import Paragraph from 'antd/es/typography/Paragraph';
import { StarOutlined } from '@ant-design/icons';
import { School, Tag } from '../../types';
import Tooltip from 'antd/es/tooltip';

// TODO will go in as props in the future
const types = ['Public School', 'Boarding School'];
const extracurriculars = ['Dueling Club', 'Quiddich', 'Charms Club', 'Potions Club', 'Astronomy Club'];
const amenities = ['Quidditch Pitch', 'Flying Grounds', 'Hospital Wing', 'Dining Hall'];
const others = ['Triwizard Tournament'];

const categories = [{
  name: 'Type',
  value: types
},
{
  name: 'Extracurricular',
  value: extracurriculars
},
{
  name: 'Amenities',
  value: amenities
},
{
  name: 'Other',
  value: others
}];

interface State {
  school: School,
}

class SchoolDetail extends React.Component<RouteComponentProps> {
  state: Readonly<State> = {
    school: {
      id: 0,
      name: 'unset_name',
      description: 'unset_description',
      student_satisfaction: 0,
      parent_satisfaction: 0,
      img_src: 'no_src',
      tags: new Set<number>(),
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
      <NewLayout>
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
              <table style={{
                display: 'flex',
                flexFlow: 'column wrap',
                alignItems: 'center'
              }}>
                {categories.map(elem => {
                  return (
                    <div>
                      <tr>
                        <th style={{ textAlign: 'center' }}>{elem.name}</th>
                      </tr>
                      <tr>
                        {elem.value.map(pill => {
                          // The search results go to tooltip
                          return <Tooltip title={pill}>
                            <th style={{ flexShrink: 2 }} className={'pill'}>{pill}</th>
                          </Tooltip>;
                        })}
                      </tr>
                    </div>
                  );
                })}
              </table>
            </th>
            <th className={'misc'}>
              <iframe
                src="https://calendar.google.com/calendar/embed?src=0dmsr8gecd94i4sjrdq18j96j4%40group.calendar.google.com&ctz=Europe%2FLondon"
                width="300" height="200" frameBorder="0" scrolling="no"/>
              <br/>

              <iframe src="http://maps.google.com/maps?q=56.207862,-2.803599&z=15&output=embed"/>
            </th>
          </tr>
        </table>
      </NewLayout>
    );
  }
}

export default SchoolDetail;

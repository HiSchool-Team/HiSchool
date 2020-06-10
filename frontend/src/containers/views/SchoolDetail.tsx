import React from 'react';

import { Card, Col, Row } from 'antd';
import myData from '../../newData.json';
import NewLayout from '../NewLayout';
import { RouteComponentProps } from 'react-router-dom';
import './SchoolDetail.css';
import Paragraph from 'antd/es/typography/Paragraph';
import { StarOutlined } from '@ant-design/icons';
import { School } from '../../types';
import Tooltip from 'antd/es/tooltip';
import {goToNewUrl} from "../../utils/utils";
import {schoolListBasePath} from "./SchoolList";

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
    },
  };

  savedIcon () {
    // TODO add retrieval of information based on user account
    // and add <StarFilled /> return
    return <StarOutlined style={{ fontSize: '2.71vw' }} onClick={e => this.changeSavedIcon()}/>;
  }

  changeSavedIcon () {
    // TODO cause change of saved status for user account
  }

  loadData() {

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
          <div style={{
            display: "flex",
            flexFlow: "row nowrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <div style={{alignSelf: "flex-start", width: "75%"}}>
              {this.state.school.description}
            </div>
            <div style={{
              padding: "2px 15px 2px 15px"
            }}>
              <a href="https://www.wizardingworld.com/">Website</a><br/>
              <a href="https://www.google.com">Twitter</a><br/>
              <a href="https://www.facebook.com/wizardingworld/">Facebook</a><br/>
            </div>
            <img style={{width: "20%"}} src={this.state.school.img_src}/>
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
          }}>
            <Paragraph strong style={{fontSize: 'large'}}>School Motto:</Paragraph>
            <Paragraph style={{
              fontSize: 'large',
              fontStyle: 'italic'
            }}>
              Draco Dormiens Numquam Titillandus
            </Paragraph>
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <a className={'qa-link'} style={{float: 'left'}}
               href={`${window.location.href}/qa`}>Questions & Answers </a>
            <div>
              {this.savedIcon()}
            </div>
          </div>
        </Card>

        <div style={{display: 'flex', alignItems: "center",
                     justifyContent: "space-evenly",
                     flexFlow: 'row wrap'}}>
          <div style={{
            display: 'flex',
            textAlign: "center",
            flexFlow: "column nowrap"
          }}>
            <h1>School tour</h1>
            <iframe width="420" height="315"
                    src="https://www.youtube.com/embed/TtNWXCwDs7o">
            </iframe>
          </div>
          <div style={{
            display: 'flex',
            flexFlow: 'column wrap',
            alignItems: 'center'
          }}>
            {categories.map(elem => {
              return (
                <div>
                  <div style={{textAlign: 'center'}}>
                    {elem.name}
                  </div>
                  <div>
                    {elem.value.map(pill => {
                      return <Tooltip title={"Click to find all schools with this tag"}>
                        <div style={{flexShrink: 2}} className={'pill'}
                            onClick={() => goToNewUrl(schoolListBasePath, {tags: pill})}>
                          {pill}
                        </div>
                      </Tooltip>;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{
            display: 'flex',
            flexFlow: 'column wrap',
            alignItems: 'center'
          }}>
            <iframe
              src="https://calendar.google.com/calendar/embed?src=0dmsr8gecd94i4sjrdq18j96j4%40group.calendar.google.com&ctz=Europe%2FLondon"
              width="300" height="200" frameBorder="0" scrolling="no"/>
            <iframe src="http://maps.google.com/maps?q=56.207862,-2.803599&z=15&output=embed"/>
          </div>
        </div>
      </NewLayout>
    );
  }
}

export default SchoolDetail;

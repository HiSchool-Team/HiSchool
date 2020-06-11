import React, { useEffect, useState } from 'react';

import { Card, Col, Row } from 'antd';
import data from '../../newData';
import NewLayout from '../NewLayout';
import { useParams } from 'react-router-dom';
import './SchoolDetail.css';
import Paragraph from 'antd/es/typography/Paragraph';
import { School } from '../../types';
import Tooltip from 'antd/es/tooltip';
import { SavedIcon } from '../../components/SavedIcon';
import userAPI from '../../api/UserAPI';
import schoolAPI from '../../api/SchoolAPI';
import { goToNewUrl } from '../../utils/utils';
import { schoolListBasePath } from './SchoolList';

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

const hogwarts: School = data[0] as School;

const SchoolDetail: React.FC = () => {
  const { schoolID } = useParams();
  const schoolIdParam = parseInt(schoolID);

  const [school, setSchool] = useState(hogwarts);
  const [userSaved, setUserSaved] = useState(false);

  // configure initial value of school and userSaved
  useEffect(() => {
    schoolAPI.get(schoolIdParam).then(s => {
      userAPI.hasSavedSchool(s).then(isUserSaved => setUserSaved(isUserSaved));
      setSchool(s);
    });
  }, [schoolIdParam]);

  const userSave = () => {
    userAPI.saveSchool(school);
    setUserSaved(true);
  };

  const userUnsave = () => {
    userAPI.unsaveSchool(school);
    setUserSaved(false);
  };

  return (
    <NewLayout>
      <Card title={<div>{school.name} <SavedIcon isSaved={userSaved} onSave={userSave} onUnsave={userUnsave} /></div>} >
        <Row>
          <Col span={16}>
            <Paragraph>
              {school.description}
            </Paragraph>
          </Col>
          <Col span={1}/>
          <Col span={2}>
            <a href="https://www.wizardingworld.com/">Website</a><br/>
            <a href="https://www.google.com">Twitter</a><br/>
            <a href="https://www.facebook.com/wizardingworld/">Facebook</a><br/>
          </Col>
          <Col span={5}>
            <img className={'school-picture'} alt="" src={school.img_src != null ? school.img_src : school.img_link}/>
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
                        return <Tooltip title={'Click to find all schools with this tag'}>
                          <th style={{ flexShrink: 2 }} className={'pill'}
                            onClick={() => goToNewUrl(schoolListBasePath, { tags: pill })}>
                            {pill}
                          </th>
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
};

export default SchoolDetail;

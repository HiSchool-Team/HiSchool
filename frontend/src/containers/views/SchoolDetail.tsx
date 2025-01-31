import React, { useEffect, useState } from 'react';

import Calendar from 'react-calendar';
import { Card } from 'antd';
import data from '../../newData';
import NewLayout from '../NewLayout';
import { useParams } from 'react-router-dom';
import './SchoolDetail.css';
import Paragraph from 'antd/es/typography/Paragraph';
import { School, Tag } from '../../types';
import Tooltip from 'antd/es/tooltip';
import { SavedIcon } from '../../components/SavedIcon';
import applicantAccountAPI from '../../api/ApplicantAccount';
import schoolAPI from '../../api/School';
import { goToNewUrl } from '../../utils/utils';
import { schoolListBasePath } from './SchoolList';
import { TagComponent } from '../../components/TagComponent';
import userContext from '../../context/User';
import tagAPI from '../../api/Tag';

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

type TagsProps = {
  tags: Tag[],
};
const TagsBox: React.FC<TagsProps> = ({ tags }) => {
  console.log('rendering TagsBox with tags:');
  console.log(tags);

  return (
    <div style={{
      display: 'flex',
      flexFlow: 'column wrap',
      alignItems: 'center'
    }}>
      {categories.map(category => {
        return (
          <div>
            <div style={{ textAlign: 'center' }}>
              {category.name}
            </div>
            <div>
              {tags
                .filter(tag => tag.type === category.name)
                .map(tag => {
                  return (
                    <Tooltip title={'Click to find all schools with this tag'}>
                      <TagComponent id={tag.id}
                        draggable={false}
                        style={{ flexShrink: 2 }}
                        onClick={() => goToNewUrl(schoolListBasePath, { tags: tag.name })}
                        name={tag.name}/>
                    </Tooltip>);
                })}
              {/* category.value.map(pill => {
              // TODO id in tag should be changed when tags come from backend
                return <Tooltip title={'Click to find all schools with this tag'}>
                  <TagComponent id={0}
                    draggable={false}
                    style={{ flexShrink: 2 }}
                    onClick={() => goToNewUrl(schoolListBasePath, { tags: pill })}
                    name={pill}/>
                </Tooltip>;
              }) */}
            </div>
          </div>
        );
      })}
    </div>);
};
const SchoolDetail: React.FC = () => {
  const { schoolID } = useParams();
  const schoolIdParam = parseInt(schoolID);

  const [school, setSchool] = useState(hogwarts);
  const [userSaved, setUserSaved] = useState(false);

  const [tags, setTags] = useState(new Array<Tag>());

  const addition = (userContext.getSchoolId() === parseInt(schoolID)) ? '/admin' : '';
  const qaLink = `${window.location.href}/qa` + addition;

  // configure initial value of school and userSaved
  useEffect(() => {
    schoolAPI.get(schoolIdParam).then(s => {
      if (userContext.isApplicantAccount()) {
        applicantAccountAPI.hasSavedSchool(s).then(isUserSaved => setUserSaved(isUserSaved));
      }
      setSchool(s);

      tagAPI.getFor(s).then(tags => {
        console.log('Setting tags: ');
        console.log(tags);
        setTags([]);
        setTags(tags);
        console.log('Finished setting tags');
      });
    });
  }, [schoolIdParam]);

  const userSave = () => {
    applicantAccountAPI.saveSchool(school);
    setUserSaved(true);
  };

  const userUnsave = () => {
    applicantAccountAPI.unsaveSchool(school);
    setUserSaved(false);
  };

  const [date, setDate] = useState(new Date());

  const onChange = (date : any) => {
    setDate(date);
  };

  return (
    <NewLayout>
      <Card title={
        <div>
          {school.name}
          {userContext.isApplicantAccount() && <SavedIcon isSaved={userSaved} onSave={userSave} onUnsave={userUnsave}/>}
        </div>
      }>
        <div style={{
          display: 'flex',
          flexFlow: 'row nowrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            alignSelf: 'flex-start',
            width: '75%'
          }}>
            {school.description}
          </div>
          <div style={{
            padding: '2px 5px 2px 5px'
          }}>
            <a href={school.website}>Website</a><br/>
            <a href={school.twitter}>Twitter</a><br/>
            <a href={school.facebook}>Facebook</a><br/>
          </div>
          <img style={{ width: '20%' }} src={school.img_src ? school.img_src : school.img_link}/>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <Paragraph strong style={{ fontSize: 'large' }}>School Motto: </Paragraph>
          <Paragraph style={{
            fontSize: 'large',
            fontStyle: 'italic'
          }}>
            {school.motto}
          </Paragraph>
        </div>
        <a className={'qa-link'} style={{ float: 'left' }}
          href={qaLink}>Questions & Answers </a>
      </Card>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexFlow: 'row wrap'
      }}>
        <div style={{
          display: 'flex',
          textAlign: 'center',
          flexFlow: 'column nowrap'
        }}>
          <h1>School tour</h1>
          <iframe width="420" height="315"
            src={school.video}>
          </iframe>
        </div>
        <TagsBox tags={tags} />
        <div style={{
          display: 'flex',
          flexFlow: 'column wrap',
          alignItems: 'center'
        }}>
          <Calendar className={'calendar'} onChange={onChange}
            value={date}/>
          <iframe className={'map'}
            src={school.map} />
        </div>
      </div>
    </NewLayout>
  );
};

export default SchoolDetail;

import React, { useEffect, useState } from 'react';

import { Button, Card, Col, Form, Input, PageHeader, Row, Select } from 'antd';
import data from '../../newData';
import NewLayout from '../NewLayout';
import { RouteComponentProps } from 'react-router-dom';
import './SchoolDetail.css';
import { School, Tag, User } from '../../types';
import TextArea from 'antd/es/input/TextArea';
import { Store } from 'antd/lib/form/interface';
import schoolAPI from '../../api/School';
import tagAPI from '../../api/Tag';
import { goToNewUrl } from '../../utils/utils';
import { homePath } from '../../routes';
import userContext from '../../context/User';
import authAPI from '../../api/Auth';

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
  selectedTags: string[],
}

const SchoolDetailAdmin: React.FC = () => {
  const pageTitleObject =
    <Row>
      <Col span={10}>
        <PageHeader title='School Page Editor'/>
      </Col>
    </Row>;

  const titleEditorFormItem =
    <Form.Item
      name='schoolName'
      rules={[{
        required: true,
        message: 'Please input a school name!'
      }]}>
      <Input placeholder='Input School Name'/>
    </Form.Item>;

  const titleEditorSection =
    <div>
      <Row>
        <Col span={10} offset={5}>
          <h2>School Name</h2>
        </Col>
      </Row>

      <Row>
        <Col span={9} offset={5}>
          {titleEditorFormItem}
        </Col>
      </Row>
    </div>;

  const descriptionEditorFormItem =
    <Form.Item
      name='schoolDescription'
      rules={[{
        required: true,
        message: 'Please input a school description!'
      }]}>
      <TextArea
        placeholder="Input school description"
        autoSize={{ minRows: 5 }}
      />
    </Form.Item>;

  const descriptionEditorSection =
    <div>
      <Row>
        <Col span={10} offset={5}>
          <h2>School Description</h2>
        </Col>
      </Row>

      <Row>
        <Col span={15} offset={5}>
          {descriptionEditorFormItem}
        </Col>
      </Row>
    </div>;

  const mottoEditorFormItem =
    <Form.Item
      name='schoolMotto'>
      <Input
        placeholder="Input school motto"
      />
    </Form.Item>;

  const mottoEditorSection =
    <div>
      <Row>
        <Col span={10} offset={5}>
          <h2>School Motto (Optional)</h2>
        </Col>
      </Row>

      <Row>
        <Col span={15} offset={5}>
          {mottoEditorFormItem}
        </Col>
      </Row>
    </div>;

  const imgLinkFormItem =
    <Form.Item
      name='imgLink'>
      <Input
        placeholder="Input a link to a school's picture"
      />
    </Form.Item>;

  const websiteLinkFormItem =
    <Form.Item
      name='websiteLink'>
      <Input
        placeholder="Input school website link"
      />
    </Form.Item>;

  const facebookLinkFormItem =
    <Form.Item
      name='facebookLink'>
      <Input
        placeholder="Input school facebook page link"
      />
    </Form.Item>;

  const twitterLinkFormItem =
    <Form.Item
      name='twitterLink'>
      <Input
        placeholder="Input school twitter link"
      />
    </Form.Item>;

  const linkEditorSection =
    <div>
      <Row>
        <Col span={10} offset={5}>
          <h2>Links (Optional)</h2>
        </Col>
      </Row>

      <Row>
        <Col span={15} offset={5}>
          {imgLinkFormItem}
        </Col>
      </Row>

      <Row>
        <Col span={15} offset={5}>
          {websiteLinkFormItem}
        </Col>
      </Row>

      <Row>
        <Col span={15} offset={5}>
          {facebookLinkFormItem}
        </Col>
      </Row>

      <Row>
        <Col span={15} offset={5}>
          {twitterLinkFormItem}
        </Col>
      </Row>
    </div>;

  const videoLinkFormItem =
    <Form.Item
      name='videoLink'>
      <Input
        placeholder="Input school video youtube link"
      />
    </Form.Item>;

  const videoLinkFormSection =
    <div>
      <Row>
        <Col span={10} offset={5}>
          <h2>School Video Youtube Link (Optional)</h2>
        </Col>
      </Row>

      <Row>
        <Col span={15} offset={5}>
          {videoLinkFormItem}
        </Col>
      </Row>
    </div>;

  const calendarLinkFormItem =
    <Form.Item
      name='calendarLink'>
      <Input
        placeholder="Input school google calendar link"
      />
    </Form.Item>;

  const calendarLinkSection =
    <div>
      <Row>
        <Col span={10} offset={5}>
          <h2>School Google Calendar Link (Optional)</h2>
        </Col>
      </Row>

      <Row>
        <Col span={15} offset={5}>
          {calendarLinkFormItem}
        </Col>
      </Row>
    </div>;

  const mapLinkFormItem =
    <Form.Item
      name='mapLink'>
      <Input
        placeholder="Input school google maps link"
      />
    </Form.Item>;

  const mapLinkSection =
    <div>
      <Row>
        <Col span={10} offset={5}>
          <h2>School Google Maps Link (Optional)</h2>
        </Col>
      </Row>

      <Row>
        <Col span={15} offset={5}>
          {mapLinkFormItem}
        </Col>
      </Row>
    </div>;

  const [allTags, setAllTags] = useState(new Array<Tag>());
  const [selectedTags, setSelectedTags] = useState(new Array<Tag>());

  useEffect(() => {
    tagAPI.getAll().then(tags => setAllTags(tags));
  }, []);

  // TODO create proper backend connection instead of frontend mockup
  // TODO figure out how to do this with tag ids (there is weirdness where the select wants to display the same type as its values) (do we want to do this? as this is just the front end)
  const unselectedTags: Tag[] = allTags.filter(t => !selectedTags.includes(t));

  const handleSelection = (selectedTagsNames: string[]) => {
    setSelectedTags(allTags.filter(t => selectedTagsNames.includes(t.name)));
  };

  const tagSelectFormItem =
    <Form.Item name={'selectTags'}>
      <Select
        mode='multiple'
        placeholder='Select school tags'
        value={selectedTags.map(t => t.name)}
        onChange={handleSelection}
        style={{ width: '100%' }}
      >
        {unselectedTags.map(t => {
          return (<Select.Option key={t.name} value={t.name}>{t.name}</Select.Option>);
        })}
      </Select>;
    </Form.Item>;

  const tagSelectSection =
    <div>
      <Row>
        <Col span={10} offset={5}>
          <h2>School Tags (Optional)</h2>
        </Col>
      </Row>

      <Row>
        <Col span={15} offset={5}>
          {tagSelectFormItem}
        </Col>
      </Row>
    </div>;

  const saveButton =
    <Row>
      <Col span={10} offset={5}>
        <Form.Item>
          <Button type="primary"
            htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Col>
    </Row>;

  const onFinish = ({
    schoolName,
    schoolDescription,
    schoolMotto,
    imgLink,
    websiteLink,
    facebookLink,
    twitterLink,
    videoLink,
    calendarLink,
    mapLink
  }: Store) => {
    const school: School = {
      id: 0,
      name: schoolName,
      description: schoolDescription,
      motto: schoolMotto,
      student_satisfaction: 4.2,
      img_link: imgLink,
      website: websiteLink,
      facebook: facebookLink,
      twitter: twitterLink,
      video: videoLink,
      calendar: calendarLink,
      map: mapLink,
      parent_satisfaction: 4.2,
      tags: []
    };

    console.log('selected tags are:');
    console.log(selectedTags);
    schoolAPI
      .post(school)
      .then(registeredSchool => {
        const userWithSchool: User = userContext.get() as User;
        userWithSchool.school = registeredSchool;
        userContext.set(userWithSchool);
        goToNewUrl(homePath);
        window.location.reload(true);
      });
  };
  // TODO add default values based on account (existing entries)
  return (
    <NewLayout>
      <Form onFinish={onFinish}>
        {pageTitleObject}
        {titleEditorSection}
        {descriptionEditorSection}
        {mottoEditorSection}
        {linkEditorSection}
        {videoLinkFormSection}
        {calendarLinkSection}
        {mapLinkSection}
        {/* tagSelectSection */}
        {saveButton}
      </Form>
    </NewLayout>
  );
};

export default SchoolDetailAdmin;

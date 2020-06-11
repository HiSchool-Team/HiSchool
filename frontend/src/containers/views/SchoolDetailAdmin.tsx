import React from 'react';

import { Button, Card, Col, Form, Input, PageHeader, Row } from 'antd';
import data from '../../newData';
import NewLayout from '../NewLayout';
import { RouteComponentProps } from 'react-router-dom';
import './SchoolDetail.css';
import { School } from '../../types';
import TextArea from 'antd/es/input/TextArea';
import { Store } from 'antd/lib/form/interface';
import schoolAPI from '../../api/SchoolAPI';

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

class SchoolDetailAdmin extends React.Component<RouteComponentProps> {
  state: Readonly<State> = {
    school: {
      id: 0,
      name: 'unset_name',
      description: 'unset_description',
      student_satisfaction: 0,
      parent_satisfaction: 0,
      img_src: 'no_src',
      tags: new Set<number>()
    }
  };

  componentDidMount () {
    const correctSchool = data[0];

    this.setState({
      school: correctSchool
    });
  }

  render () {
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
        tags: new Set<number>(),
        website_link: websiteLink,
        facebook_link: facebookLink,
        twitter_link: twitterLink,
        video_link: videoLink,
        calendar_link: calendarLink,
        map_link: mapLink,
        parent_satisfaction: 4.2
      };

      schoolAPI.post(school);
    };

    const pageTitleObject =
      <Row>
        <Col span={24}>
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
          <Col span={24}>
            <h2>School Name</h2>
          </Col>
        </Row>

        <Row>
          <Col span={9}>
            {titleEditorFormItem}
          </Col>
          <Col span={15}/>
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
          <Col span={24}>
            <h2>School Description</h2>
          </Col>
        </Row>

        <Row>
          <Col span={15}>
            {descriptionEditorFormItem}
          </Col>
          <Col span={9}/>
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
          <Col span={24}>
            <h2>School Motto (Optional)</h2>
          </Col>
        </Row>

        <Row>
          <Col span={15}>
            {mottoEditorFormItem}
          </Col>
          <Col span={9}/>
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
          <Col span={24}>
            <h2>Links (Optional)</h2>
          </Col>
        </Row>

        <Row>
          <Col span={15}>
            {imgLinkFormItem}
          </Col>
        </Row>

        <Row>
          <Col span={15}>
            {websiteLinkFormItem}
          </Col>
          <Col span={9}/>
        </Row>

        <Row>
          <Col span={15}>
            {facebookLinkFormItem}
          </Col>
          <Col span={9}/>
        </Row>

        <Row>
          <Col span={15}>
            {twitterLinkFormItem}
          </Col>
          <Col span={9}/>
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
          <Col span={24}>
            <h2>School Video Youtube Link (Optional)</h2>
          </Col>
        </Row>

        <Row>
          <Col span={15}>
            {videoLinkFormItem}
          </Col>
          <Col span={9}/>
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
          <Col span={24}>
            <h2>School Google Calendar Link (Optional)</h2>
          </Col>
        </Row>

        <Row>
          <Col span={15}>
            {calendarLinkFormItem}
          </Col>
          <Col span={9}/>
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
          <Col span={24}>
            <h2>School Google Maps Link (Optional)</h2>
          </Col>
        </Row>

        <Row>
          <Col span={15}>
            {mapLinkFormItem}
          </Col>
          <Col span={9}/>
        </Row>
      </div>;

    const saveButton =
      <Row>
        <Col span={24}>
          <Form.Item>
            <Button type="primary"
              htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Col>
      </Row>;

    // TODO add tag selection

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
          {saveButton}
        </Form>
      </NewLayout>
    );
  }
}

export default SchoolDetailAdmin;

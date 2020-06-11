import React from 'react';
import { Button, Form, Input, Collapse } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { CaretRightOutlined } from '@ant-design/icons/lib';
import { Store } from 'antd/lib/form/interface';
import { postQA } from '../../api/QA';
import { QA } from '../../types';

const { Panel } = Collapse;

type Props = {
  recipientSchoolId: number,
};

const AskBar: React.FC<Props> = ({ recipientSchoolId }) => {
  const questionTitleInput =
    <Form.Item name="title" label="Ask a question" style={{ margin: 'auto' }}>
      <Input placeholder="The title of your question"/>
    </Form.Item>;

  const questionBodyInput =
    <Form.Item name="description" rules={[{ required: true }]}>
      <TextArea
        placeholder="A more extended description of your question"
        autoSize
      />
    </Form.Item>;

  const submitButton =
    <Form.Item>
      <Button type="primary" htmlType="submit">Submit</Button>
    </Form.Item>;

  const onFinish = ({ title, description }: Store) => {
    const qa: QA = {
      id: 0,
      recipient_school_id: recipientSchoolId,
      question: {
        title: title,
        body: description
      },
      answer: undefined
    };
    console.log('Calling postQA with QA:');
    console.log(qa);
    postQA(qa);

    window.location.reload(true); // FIXME This is bad practice
  };

  return (
    <Form onFinish={onFinish}>
      <Collapse
        bordered={false}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0}/>}>

        <Panel header={questionTitleInput} key="1" className="site-collapse-custom-panel">
          {questionBodyInput}
          {submitButton}
        </Panel>
      </Collapse>
    </Form>
  );
};

export default AskBar;

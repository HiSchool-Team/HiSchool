import React from 'react';
import { Button, Form, Input, Collapse } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { CaretRightOutlined } from '@ant-design/icons/lib';
import { Store } from 'antd/lib/form/interface';

const { Panel } = Collapse;

const onFinish = ({ title, description }: Store) => {
  console.log('title: '.concat(title));
  console.log('description: '.concat(description));
};

const AskBar = () => {
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

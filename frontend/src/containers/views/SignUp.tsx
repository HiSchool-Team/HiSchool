import React from 'react';
import NewLayout from '../NewLayout';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import { Store } from 'antd/lib/form/interface';

const SignUp: React.FC = () => {
  const onFinish = ({ email, username, password, reconfirmedPassword }: Store) => {
    // TODO connect through API
  };

  const usernameFormItem =
    <Form.Item
      label="Username"
      name="username"
      rules={[{
        required: true,
        message: 'Please input a username!'
      }]}
    >
      <Input/>
    </Form.Item>;

  const passwordFormItem =
    <Form.Item
      label="Password"
      name="password"
      rules={[{
        required: true,
        message: 'Please input a password!'
      }]}
    >
      <Input.Password/>
    </Form.Item>;

  const reconfirmPasswordFormItem =
    <Form.Item
      label="Re-enter Password"
      name="reconfirmedPassword"
      rules={[{
        required: true,
        message: 'Please re-enter the password!'
      }]}
    >
      <Input.Password/>
    </Form.Item>;

  const emailFormItem =
    <Form.Item
      label="Email Address"
      name="email"
      rules={[{
        required: true,
        message: 'Please input your email address!'
      }]}
    >
      <Input/>
    </Form.Item>;

  const submitButtonFormItem =
    <Form.Item {...{
      wrapperCol: {
        offset: 8,
        span: 16
      }
    }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>;

  const loginLayout =
    <Row>
      <Col span={8} offset={8}>
        <Card>
          {emailFormItem}
          {usernameFormItem}
          {passwordFormItem}
          {reconfirmPasswordFormItem}
          {submitButtonFormItem}
        </Card>
      </Col>
    </Row>;

  const view = (
    <NewLayout>
      <div>
        <Card style={{backgroundColor: 'rgba(180, 180, 180, 0.0)'}}>
          <Form {...{
            labelCol: { span: 8 },
            wrapperCol: { span: 16 }
          }}
          name='login'
          onFinish={onFinish}>
            {loginLayout}
          </Form>
        </Card>
      </div>
    </NewLayout>
  );

  return view;
};

export default SignUp;

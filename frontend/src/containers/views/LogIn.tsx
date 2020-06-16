import React from 'react';
import NewLayout from '../NewLayout';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import { Store } from 'antd/lib/form/interface';
import authAPI from '../../api/Auth';
import { goToNewUrl } from '../../utils/utils';
import { homePath } from '../../routes';

const LogIn: React.FC = () => {
  const onFinish = ({ username, password }: Store) => {
    authAPI
      .login(username, password)
      .then(() => goToNewUrl(homePath))
      .catch(err => {
        const msg = 'login failed: check your credentials';
        alert(msg);
        console.warn(msg, err);
      });
  };

  const usernameFormItem =
    <Form.Item
      label="Username"
      name="username"
      rules={[{
        required: true,
        message: 'Please input your username!'
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
        message: 'Please input your password!'
      }]}
    >
      <Input.Password/>
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
      <Col span={6} offset={9}>
        <Card>
          {usernameFormItem}
          {passwordFormItem}
          {submitButtonFormItem}
        </Card>
      </Col>
    </Row>;

  const view = (
    <NewLayout>
      <div>
        <Card style={{ backgroundColor: 'rgba(180, 180, 180, 0.0)' }}>
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

export default LogIn;

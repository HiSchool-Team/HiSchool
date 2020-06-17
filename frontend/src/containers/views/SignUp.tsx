import React, { useState } from 'react';
import NewLayout from '../NewLayout';
import { Button, Card, Col, Form, Input, Row, Radio } from 'antd';
import { Store } from 'antd/lib/form/interface';
import authAPI from '../../api/Auth';
import userContext from '../../context/User';
import { goToNewUrl } from '../../utils/utils';
import { loginPath } from '../../routes';

const SignUp: React.FC = () => {
  const [isApplicantAccount, setIsApplicantAccount] = useState(true);

  const onFinish = (values: Store) => {
    console.log('submitting form with values');
    console.log(values);

    const { email, username, password, reconfirmedPassword } = values;
    if (password !== reconfirmedPassword) {
      const msg = 'passwords don\'t match';
      // alert(msg);
      return;
    }

    authAPI
      .register(username, email, password, reconfirmedPassword, isApplicantAccount)
      .then(() => goToNewUrl(loginPath));
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

  const accountTypeFormItem =
    <Form.Item label="Account Type">
      <Radio.Group
        value={isApplicantAccount ? 'applicant' : 'school'}
        onChange={e => setIsApplicantAccount(e.target.value === 'applicant')}>
        <Radio.Button value={'applicant'}>Applicant</Radio.Button>
        <Radio.Button value={'school'}>School</Radio.Button>
      </Radio.Group>
    </Form.Item>;

  const submitButtonFormItem =
    <Form.Item {...{
      wrapperCol: {
        offset: 8,
        span: 16
      }
    }}>
      <Button type="primary" htmlType="submit">
        Signup
      </Button>
    </Form.Item>;

  const loginLayout =
    <Row>
      <Col span={8} offset={8}>
        <Card style={{ minWidth: 'max-content' }}>
          {emailFormItem}
          {usernameFormItem}
          {passwordFormItem}
          {reconfirmPasswordFormItem}
          {accountTypeFormItem}
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

export default SignUp;

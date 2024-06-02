import { useEffect } from 'react';
import { Button, Form, Input, Layout, message, Typography } from 'antd/es';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setUser, userSelector } from '@/store/slices/userSlice';

import styles from './LoginPage.module.scss';

const emailRegexp =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

const LoginPage = () => {
  const [messageApi, context] = message.useMessage();
  const dispatch = useDispatch();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Login success',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Wrong email or password',
    });
  };

  const onSubmit = (values: { email: string; password: string }) => {
    const { email, password } = values;
    if (email === 'user@user.com' && password === '12345') {
      dispatch(setUser({ ...values, role: 'user' }));
      success();
    } else if (email === 'admin@admin.com' && password === '67890') {
      setUser({ ...values, role: 'admin' });
      success();
    } else {
      error();
    }
  };

  return (
    <Layout.Content className={styles.loginFormHolder}>
      {context}
      <Form
        layout="vertical"
        onFinish={onSubmit}
        className={styles.loginFormHolder_form}
      >
        <Typography.Title>LogIn</Typography.Title>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Enter email' },
            { pattern: emailRegexp, message: 'Enter valid email' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Enter password' }]}
        >
          <Input.Password />
        </Form.Item>

        <Button htmlType="submit">Submit</Button>
      </Form>
    </Layout.Content>
  );
};

const LoginPrivateRoute = () => {
  const navigate = useNavigate();
  const { user } = useSelector(userSelector);
  useEffect(() => {
    if (user) {
      navigate('/tasks');
    }
  }, [navigate, user]);

  if (user) {
    return <></>;
  } else {
    return <LoginPage />;
  }
};

export { LoginPrivateRoute as LoginPage };

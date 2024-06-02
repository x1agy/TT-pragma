import { useEffect } from 'react';
import { Button, Flex, Layout, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setUser, userSelector } from '@/store/slices/userSlice';

const LogoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (type: 'confirm' | 'deny') => {
    if (type === 'confirm') {
      navigate('/');
      dispatch(setUser(null));
    } else {
      navigate('/tasks');
    }
  };

  return (
    <Layout.Content>
      <Flex vertical align="center">
        <Typography.Title>Are you sure want to leave?</Typography.Title>
        <Flex gap="18px">
          <Button onClick={() => handleClick('confirm')}>Yes</Button>
          <Button onClick={() => handleClick('deny')}>No</Button>
        </Flex>
      </Flex>
    </Layout.Content>
  );
};

const PrivateLogoutRoute = () => {
  const navigate = useNavigate();
  const { user } = useSelector(userSelector);
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [navigate, user]);

  if (!user) {
    return <></>;
  } else {
    return <LogoutPage />;
  }
};

export { PrivateLogoutRoute as LogoutPage };

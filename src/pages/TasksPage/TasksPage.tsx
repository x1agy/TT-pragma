import { useEffect } from 'react';
import { Flex, Layout } from 'antd/es';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { userSelector } from '@/store/slices/userSlice';

const TasksPage = () => {
  return (
    <Layout.Content>
      <Flex>1</Flex>
    </Layout.Content>
  );
};

const TasksPrivateRoute = () => {
  const navigate = useNavigate();
  const { user } = useSelector(userSelector);
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [navigate, user]);

  if (user) {
    return <></>;
  } else {
    return <TasksPage />;
  }
};

export { TasksPrivateRoute as TasksPage };

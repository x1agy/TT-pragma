import { Button, Flex, Typography } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { BiLogOut } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { userSelector } from '@/store/slices/userSlice';

import styles from './AppHeader.module.scss';

export const AppHeader = () => {
  const { user } = useSelector(userSelector);
  const navigate = useNavigate();

  const logout = () => {
    navigate('logout');
  };

  return (
    <Header className={styles.header}>
      <Typography.Title className={styles.header_title}>
        Some header text
      </Typography.Title>
      {user && (
        <Flex align="center" className={styles.authorizedUser} gap="18px">
          <Typography.Title level={3} className={styles.authorizedUser_role}>
            Your role is: <strong>{user.role}</strong>
          </Typography.Title>
          <Button onClick={logout}>
            <BiLogOut />
          </Button>
        </Flex>
      )}
    </Header>
  );
};

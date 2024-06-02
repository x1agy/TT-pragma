import { useEffect, useMemo } from 'react';
import { Flex, Layout, Table } from 'antd/es';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useFilterProps } from '@/hooks/useFilterProps';
import { tasksSelector } from '@/store/slices/tasksSlice';
import { userSelector } from '@/store/slices/userSlice';
import { TasksType } from '@/types/stateTypes';
import { tableColumns } from '@/utils/tasksUtils';

import styles from './TasksPage.module.scss';

const TasksPage = () => {
  const { tasks } = useSelector(tasksSelector);
  const [getFilters] = useFilterProps();

  const tableData = useMemo(() => {
    return (
      tasks?.map((task) => ({
        ...task,
        status: task.status ? 'Close' : 'Open',
      })) ?? []
    );
  }, [tasks]);

  return (
    <Layout.Content>
      <Flex vertical>
        <Table
          dataSource={tableData}
          pagination={{ pageSize: 3 }}
          columns={tableColumns.map((column) => ({
            ...column,
            ...getFilters(
              (column.title as string).toLowerCase() as keyof TasksType,
            ),
          }))}
          rowClassName={(rowData) =>
            rowData.status === 'Close' ? styles.closed : styles.opened
          }
        />
      </Flex>
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

  if (!user) {
    return <></>;
  } else {
    return <TasksPage />;
  }
};

export { TasksPrivateRoute as TasksPage };

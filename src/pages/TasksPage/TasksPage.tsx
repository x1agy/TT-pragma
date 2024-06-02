import { useCallback, useEffect, useMemo, useState } from 'react';
import { Flex, Form, Layout, Popconfirm, Table, Typography } from 'antd/es';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AddTask, EditableCell } from '@/components';
import { TableFilterData, useFilterProps } from '@/hooks/useFilterProps';
import { editTask, tasksSelector } from '@/store/slices/tasksSlice';
import { userSelector } from '@/store/slices/userSlice';
import { TasksType } from '@/types/stateTypes';
import { tableColumns } from '@/utils';

import styles from './TasksPage.module.scss';

const TasksPage = () => {
  const { tasks } = useSelector(tasksSelector);
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [getFilters] = useFilterProps();

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const isEditing = useCallback(
    (id: string) => id === editingKey,
    [editingKey],
  );

  const edit = useCallback(
    (record: TasksType) => {
      form.setFieldsValue(record);
      setEditingKey(String(record.id));
    },
    [form],
  );

  const cancel = () => {
    setEditingKey('');
  };

  const save = useCallback(
    async (key: number) => {
      const row = (await form.validateFields()) as TasksType;
      dispatch(editTask({ ...row, id: key }));
      setEditingKey('');
    },
    [dispatch, form],
  );

  const tableData = useMemo(() => {
    return (
      tasks?.map((task) => ({
        ...task,
        status: task.status ? 'Close' : 'Open',
      })) ?? []
    );
  }, [tasks]);

  const columnsData = useMemo(() => {
    if (user?.role === 'admin') {
      const modifiedColumns = tableColumns.map((column) => ({
        ...column,
        ...getFilters(column.title.toLowerCase() as keyof TasksType),
      }));

      const editActions = {
        title: 'Edit',
        dataIndex: '',
        key: 'x',
        editable: false,
        render: (record: TableFilterData) => {
          const editable = isEditing(String(record.id));
          return editable ? (
            <Flex gap="12px">
              <Typography.Link
                onClick={() => save(record.id)}
                style={{
                  marginRight: 4,
                  textWrap: 'nowrap',
                }}
              >
                Save
              </Typography.Link>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>Cancel</a>
              </Popconfirm>
            </Flex>
          ) : (
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() =>
                edit({ ...record, status: record.status === 'Close' })
              }
            >
              Edit
            </Typography.Link>
          );
        },
      };

      return [...modifiedColumns, editActions];
    } else {
      return tableColumns.map((column) => ({
        ...column,
        ...getFilters(column.title.toLowerCase() as keyof TasksType),
      }));
    }
  }, [edit, editingKey, getFilters, isEditing, save, user?.role]);

  const mergedColumns = columnsData.map((col) => {
    if ('editable' in col && !col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: TableFilterData) => {
        return {
          record,
          inputType: col.dataIndex === 'status' ? 'boolean' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(String(record.id)),
          checked: record.status === 'Close',
        };
      },
    };
  });

  return (
    <Layout.Content>
      <Flex vertical align="center">
        <Form form={form} component={false}>
          <Table
            size="large"
            dataSource={tableData}
            pagination={{ pageSize: 3 }}
            className={styles.table}
            columns={mergedColumns as unknown as TasksType[]}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            scroll={{ x: 'max-content' }}
            rowClassName={(rowData) =>
              rowData.status === 'Close'
                ? styles.table_closed
                : styles.table_opened
            }
          />
        </Form>
        <AddTask />
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

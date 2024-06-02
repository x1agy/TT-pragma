import { TableColumnsType } from 'antd';

import { TasksType } from '@/types/stateTypes';

export const tableColumns: TableColumnsType<
  Omit<TasksType, 'status'> & { status: string }
> = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    sorter: (a, b) => a.title.localeCompare(b.title, 'en'),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    sorter: (a, b) => a.email.localeCompare(b.email, 'en'),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'desc',
    sorter: (a, b) =>
      (a?.description ?? '')?.localeCompare(b?.description ?? '', 'en') ?? 0,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => a.id - b.id,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: (a, b) => a.status.localeCompare(b.status, 'en'),
    sortDirections: ['descend', 'ascend'],
  },
];

import { TasksType } from '@/types/stateTypes';

export const tableColumns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    editable: true,
    sorter: (a: TasksType, b: TasksType) =>
      a.title.localeCompare(b.title, 'en'),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    editable: true,
    sorter: (a: TasksType, b: TasksType) =>
      a.email.localeCompare(b.email, 'en'),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'desc',
    editable: true,
    sorter: (a: TasksType, b: TasksType) =>
      (a?.description ?? '')?.localeCompare(b?.description ?? '', 'en') ?? 0,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    editable: false,
    sorter: (a: TasksType, b: TasksType) => a.id - b.id,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    editable: true,
    sorter: (a: TasksType, b: TasksType) =>
      String(a.status).localeCompare(String(b.status), 'en'),
    sortDirections: ['descend', 'ascend'],
  },
];

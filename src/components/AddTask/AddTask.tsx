import { Button, Form, Input, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useDispatch } from 'react-redux';

import { addTask } from '@/store/slices/tasksSlice';
import { TasksType } from '@/types/stateTypes';
import { emailRegexp } from '@/utils';

import styles from './AddTask.module.scss';

export const AddTask = () => {
  const [messageApi, context] = message.useMessage();
  const dispatch = useDispatch();
  const [form] = useForm();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Task added',
    });
  };

  const onTaskAdd = (values: Omit<TasksType, 'id' | 'status'>) => {
    dispatch(addTask(values));
    form.resetFields();
    success();
  };

  return (
    <Form
      layout="vertical"
      onFinish={onTaskAdd}
      form={form}
      className={styles.addTaskForm}
    >
      {context}
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
        label="Title"
        name="title"
        rules={[
          { required: true, message: 'Enter title' },
          {
            max: 25,
            min: 3,
            message: 'Enter title with length from 3 to 25',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input />
      </Form.Item>
      <Button htmlType="submit">Submit</Button>
    </Form>
  );
};

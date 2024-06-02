import { Checkbox, Form, Input } from 'antd';

import { TasksType } from '@/types/stateTypes';
import { emailRegexp } from '@/utils';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: 'boolean' | 'text';
  record: TasksType;
  index: number;
}

export const EditableCell: React.FC<
  React.PropsWithChildren<EditableCellProps>
> = ({ editing, dataIndex, title, inputType, children, ...restProps }) => {
  const inputNode =
    inputType === 'boolean' ? <Checkbox>Closed?</Checkbox> : <Input />;

  let customRule = {};

  if (dataIndex === 'title') {
    customRule = {
      max: 25,
      min: 3,
      message: 'Enter title with length from 3 to 25',
    };
  } else if (dataIndex === 'email') {
    customRule = { pattern: emailRegexp, message: 'Enter valid email' };
  } else if (dataIndex === 'status') {
    // checkbox with undefined value fix
    customRule = { required: false };
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: dataIndex !== 'description' && dataIndex !== 'status',
              message: `Enter ${title}!`,
            },
            customRule,
          ]}
          valuePropName={dataIndex === 'status' ? 'checked' : undefined}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

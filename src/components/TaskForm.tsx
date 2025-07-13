import React from 'react';
import { Modal, Form, Input, Select, DatePicker, message } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addTask, updateTask, Task } from '../store/tasksSlice';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

interface TaskFormProps {
  visible: boolean;
  onClose: () => void;
  editingTask?: Task | null;
  initialDate?: string;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters'),
  description: Yup.string()
    .max(500, 'Description must not exceed 500 characters'),
  date: Yup.string().required('Date is required'),
  category: Yup.string()
    .oneOf(['success', 'warning', 'error', 'info'], 'Invalid category')
    .required('Category is required'),
});

const TaskForm: React.FC<TaskFormProps> = ({ 
  visible, 
  onClose, 
  editingTask, 
  initialDate 
}) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: editingTask?.title || '',
      description: editingTask?.description || '',
      date: editingTask?.date || initialDate || dayjs().format('YYYY-MM-DD'),
      category: editingTask?.category || 'info',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (editingTask) {
        dispatch(updateTask({
          ...editingTask,
          ...values,
        }));
        message.success('Task updated successfully!');
      } else {
        dispatch(addTask({
          ...values,
          completed: false,
        }));
        message.success('Task added successfully!');
      }
      onClose();
      formik.resetForm();
    },
  });

  const handleCancel = () => {
    onClose();
    formik.resetForm();
  };

  const categoryOptions = [
    { value: 'success', label: 'Success', color: '#52c41a' },
    { value: 'warning', label: 'Warning', color: '#faad14' },
    { value: 'error', label: 'Error', color: '#ff4d4f' },
    { value: 'info', label: 'Info', color: '#1890ff' },
  ];

  return (
    <Modal
      title={editingTask ? 'Edit Task' : 'Add New Task'}
      open={visible}
      onCancel={handleCancel}
      onOk={formik.handleSubmit}
      confirmLoading={formik.isSubmitting}
      okText={editingTask ? 'Update' : 'Add'}
      className="task-form-modal"
    >
      <Form layout="vertical" className="mt-4">
        <Form.Item
          label="Title"
          validateStatus={formik.errors.title && formik.touched.title ? 'error' : ''}
          help={formik.errors.title && formik.touched.title ? formik.errors.title : ''}
        >
          <Input
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter task title"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          label="Description"
          validateStatus={formik.errors.description && formik.touched.description ? 'error' : ''}
          help={formik.errors.description && formik.touched.description ? formik.errors.description : ''}
        >
          <TextArea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter task description (optional)"
            rows={3}
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          label="Date"
          validateStatus={formik.errors.date && formik.touched.date ? 'error' : ''}
          help={formik.errors.date && formik.touched.date ? formik.errors.date : ''}
        >
          <DatePicker
            value={dayjs(formik.values.date)}
            onChange={(date) => formik.setFieldValue('date', date?.format('YYYY-MM-DD'))}
            className="w-full rounded-lg"
          />
        </Form.Item>

        <Form.Item
          label="Category"
          validateStatus={formik.errors.category && formik.touched.category ? 'error' : ''}
          help={formik.errors.category && formik.touched.category ? formik.errors.category : ''}
        >
          <Select
            value={formik.values.category}
            onChange={(value) => formik.setFieldValue('category', value)}
            className="w-full"
          >
            {categoryOptions.map(option => (
              <Option key={option.value} value={option.value}>
                <span className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: option.color }}
                  />
                  {option.label}
                </span>
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskForm;
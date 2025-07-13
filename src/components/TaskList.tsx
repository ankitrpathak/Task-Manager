import React, { useState } from 'react';
import { Card, List, Tag, Button, Checkbox, Empty, Space, Typography, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { deleteTask, toggleTaskComplete, Task } from '../store/tasksSlice';
import TaskForm from './TaskForm';
import dayjs from 'dayjs';

const { Text, Title } = Typography;

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks, selectedDate } = useSelector((state: RootState) => state.tasks);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const selectedTasks = tasks.filter(task => task.date === selectedDate);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormVisible(true);
  };

  const handleDelete = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  const handleToggleComplete = (taskId: string) => {
    dispatch(toggleTaskComplete(taskId));
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setIsFormVisible(true);
  };

  const handleFormClose = () => {
    setIsFormVisible(false);
    setEditingTask(null);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      success: 'green',
      warning: 'orange',
      error: 'red',
      info: 'blue',
    };
    return colors[category as keyof typeof colors] || 'default';
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      success: '✅',
      warning: '⚠️',
      error: '❌',
      info: 'ℹ️',
    };
    return icons[category as keyof typeof icons] || '📝';
  };

  return (
    <>
      <Card 
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarOutlined />
              <Title level={4} className="mb-0">
                Tasks for {dayjs(selectedDate).format('MMMM D, YYYY')}
              </Title>
            </div>
            <Button 
              type="primary" 
              onClick={handleAddTask}
              className="rounded-lg"
            >
              Add Task
            </Button>
          </div>
        }
        className="shadow-lg rounded-lg"
        bodyStyle={{ padding: selectedTasks.length === 0 ? '40px' : '16px' }}
      >
        {selectedTasks.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <span className="text-gray-500">
                No tasks for this date. Click "Add Task" to create one!
              </span>
            }
          />
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={selectedTasks}
            renderItem={task => (
              <List.Item
                className={`p-4 mb-2 rounded-lg border transition-all hover:shadow-md ${
                  task.completed ? 'bg-gray-50' : 'bg-white'
                }`}
                actions={[
                  <Button
                    key="edit"
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(task)}
                    className="text-blue-600 hover:text-blue-800"
                  />,
                  <Popconfirm
                    key="delete"
                    title="Are you sure you want to delete this task?"
                    onConfirm={() => handleDelete(task.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      className="text-red-600 hover:text-red-800"
                    />
                  </Popconfirm>
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Checkbox
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task.id)}
                      className="mt-1"
                    />
                  }
                  title={
                    <div className="flex items-center gap-2">
                      <Text
                        className={`text-lg font-semibold ${
                          task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                        }`}
                      >
                        {task.title}
                      </Text>
                      <Tag 
                        color={getCategoryColor(task.category)}
                        className="ml-2"
                      >
                        {getCategoryIcon(task.category)} {task.category.toUpperCase()}
                      </Tag>
                    </div>
                  }
                  description={
                    <Space direction="vertical" size={4}>
                      {task.description && (
                        <Text 
                          className={`text-sm ${
                            task.completed ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          {task.description}
                        </Text>
                      )}
                      <Text className="text-xs text-gray-400">
                        Created: {dayjs(task.createdAt).format('MMM D, YYYY h:mm A')}
                      </Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </Card>

      <TaskForm
        visible={isFormVisible}
        onClose={handleFormClose}
        editingTask={editingTask}
        initialDate={selectedDate}
      />
    </>
  );
};

export default TaskList;
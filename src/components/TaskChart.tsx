import React from 'react';
import { Card, Select, Button, Space, Typography, Row, Col, Statistic } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setFilterCategory } from '../store/tasksSlice';

const { Option } = Select;
const { Title } = Typography;

const TaskChart: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks, filterCategory } = useSelector((state: RootState) => state.tasks);

  const filteredTasks = filterCategory === 'all' 
    ? tasks 
    : tasks.filter(task => task.category === filterCategory);

  const getChartData = () => {
    const categoryCount = {
      success: 0,
      warning: 0,
      error: 0,
      info: 0,
    };

    filteredTasks.forEach(task => {
      categoryCount[task.category]++;
    });

    return [
      { name: 'Success', value: categoryCount.success, color: '#52c41a' },
      { name: 'Warning', value: categoryCount.warning, color: '#faad14' },
      { name: 'Error', value: categoryCount.error, color: '#ff4d4f' },
      { name: 'Info', value: categoryCount.info, color: '#1890ff' },
    ];
  };

  const getCompletionData = () => {
    const completed = filteredTasks.filter(task => task.completed).length;
    const pending = filteredTasks.filter(task => !task.completed).length;
    
    return [
      { name: 'Completed', value: completed, color: '#52c41a' },
      { name: 'Pending', value: pending, color: '#faad14' },
    ];
  };

  const handleFilterChange = (value: string) => {
    dispatch(setFilterCategory(value));
  };

  const handleReset = () => {
    dispatch(setFilterCategory('all'));
  };

  const chartData = getChartData();
  const completionData = getCompletionData();
  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter(task => task.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Card 
      title="Task Analytics" 
      className="shadow-lg rounded-lg"
      extra={
        <Space>
          <Select
            value={filterCategory}
            onChange={handleFilterChange}
            className="w-32"
          >
            <Option value="all">All Categories</Option>
            <Option value="success">Success</Option>
            <Option value="warning">Warning</Option>
            <Option value="error">Error</Option>
            <Option value="info">Info</Option>
          </Select>
          <Button onClick={handleReset} className="rounded-lg">
            Reset
          </Button>
        </Space>
      }
    >
      <Row gutter={[16, 16]} className="mb-6">
        <Col span={6}>
          <Statistic 
            title="Total Tasks" 
            value={totalTasks}
            valueStyle={{ color: '#1890ff' }}
          />
        </Col>
        <Col span={6}>
          <Statistic 
            title="Completed" 
            value={completedTasks}
            valueStyle={{ color: '#52c41a' }}
          />
        </Col>
        <Col span={6}>
          <Statistic 
            title="Pending" 
            value={totalTasks - completedTasks}
            valueStyle={{ color: '#faad14' }}
          />
        </Col>
        <Col span={6}>
          <Statistic 
            title="Completion Rate" 
            value={completionRate}
            suffix="%"
            valueStyle={{ color: completionRate >= 70 ? '#52c41a' : '#faad14' }}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card type="inner" title="Tasks by Category" className="h-80">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#1890ff" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card type="inner" title="Task Completion Status" className="h-80">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={completionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {completionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default TaskChart;
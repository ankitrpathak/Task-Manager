import React from 'react';
import { Provider } from 'react-redux';
import { Layout, Row, Col, Typography, Space } from 'antd';
import { CalendarOutlined, BarChartOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { store } from './store';
import TaskCalendar from './components/TaskCalendar';
import TaskList from './components/TaskList';
import TaskChart from './components/TaskChart';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Provider store={store}>
      <Layout className="min-h-screen bg-gray-50">
        <Header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-full px-4">
            <Space size="large">
              <CheckSquareOutlined className="text-2xl text-blue-600" />
              <Title level={2} className="mb-0 text-gray-800">
                Daily Task Manager
              </Title>
            </Space>
            <div className="flex items-center gap-6 text-gray-600">
              <Space>
                <CalendarOutlined />
                <span>Calendar</span>
              </Space>
              <Space>
                <BarChartOutlined />
                <span>Analytics</span>
              </Space>
            </div>
          </div>
        </Header>
        
        <Content className="p-6">
          <div className="max-w-7xl mx-auto">
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={14}>
                <Space direction="vertical" size="large" className="w-full">
                  <TaskCalendar />
                  <TaskList />
                </Space>
              </Col>
              <Col xs={24} lg={10}>
                <TaskChart />
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Provider>
  );
}

export default App;
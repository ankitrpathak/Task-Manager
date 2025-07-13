import React from 'react';
import { Calendar, Badge, Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setSelectedDate } from '../store/tasksSlice';
import dayjs, { Dayjs } from 'dayjs';

const TaskCalendar: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks, selectedDate } = useSelector((state: RootState) => state.tasks);

  const getTasksForDate = (date: string) => {
    return tasks.filter(task => task.date === date);
  };

  const getListData = (value: Dayjs) => {
    const date = value.format('YYYY-MM-DD');
    const dateTasks = getTasksForDate(date);
    
    return dateTasks.map(task => ({
      type: task.category,
      content: task.title,
    }));
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge 
              status={item.type as 'success' | 'warning' | 'error' | 'info'}
              text={
                <span className="text-xs truncate block max-w-[100px]">
                  {item.content}
                </span>
              }
            />
          </li>
        ))}
      </ul>
    );
  };

  const onSelect = (value: Dayjs) => {
    dispatch(setSelectedDate(value.format('YYYY-MM-DD')));
  };

  return (
    <Card 
      title="Task Calendar" 
      className="shadow-lg rounded-lg"
      bodyStyle={{ padding: '16px' }}
    >
      <Calendar
        dateCellRender={dateCellRender}
        onSelect={onSelect}
        value={dayjs(selectedDate)}
        className="task-calendar"
      />
    </Card>
  );
};

export default TaskCalendar;
# Daily Task Manager

A modern, responsive task management application built with React, TypeScript, and Ant Design. This application provides a comprehensive solution for organizing daily tasks with calendar integration, category-based organization, and detailed analytics.

## 🚀 Features

### Core Functionality
- **Task Management**: Create, edit, delete, and mark tasks as complete
- **Calendar Integration**: Visual calendar view with task indicators
- **Category System**: Organize tasks by categories (Success, Warning, Error, Info)
- **Date-based Organization**: View and manage tasks by specific dates
- **Task Filtering**: Filter tasks by category for better organization

### User Interface
- **Modern Design**: Clean, responsive interface built with Ant Design
- **Responsive Layout**: Works seamlessly across desktop and mobile devices
- **Interactive Calendar**: Click on dates to view/manage tasks for that day
- **Visual Indicators**: Color-coded badges and icons for different task categories
- **Smooth Animations**: Hover effects and transitions for better user experience

### Analytics & Insights
- **Task Statistics**: View total tasks, completed tasks, and completion rates
- **Visual Charts**: Bar charts and pie charts for task distribution
- **Category Analytics**: Breakdown of tasks by category
- **Completion Tracking**: Monitor your productivity with completion rates
- **Filterable Data**: Analyze specific categories or view overall statistics

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.3.1
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **UI Framework**: Ant Design 5.26.4
- **Styling**: Tailwind CSS
- **Charts**: Recharts 3.1.0
- **Date Handling**: Day.js 1.11.13
- **Form Management**: Formik 2.4.6 with Yup validation
- **Icons**: Ant Design Icons & Lucide React
- **Build Tool**: Vite 5.4.2

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Task Manager"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🎯 Usage

### Adding Tasks
1. Click the **"Add Task"** button in the task list
2. Fill in the task details:
   - **Title**: Task name (required)
   - **Description**: Optional task description
   - **Date**: Select the date for the task
   - **Category**: Choose from Success, Warning, Error, or Info
3. Click **"Create Task"** to save

### Managing Tasks
- **Mark Complete**: Click the checkbox next to any task
- **Edit Task**: Click the edit icon to modify task details
- **Delete Task**: Click the delete icon and confirm deletion
- **View by Date**: Click on any date in the calendar to view tasks for that day

### Using Analytics
- **View Statistics**: Check the analytics panel for task metrics
- **Filter by Category**: Use the category filter to analyze specific task types
- **Track Progress**: Monitor completion rates and task distribution
- **Visual Insights**: Review bar charts and pie charts for better understanding

## 🏗️ Project Structure

```
src/
├── components/
│   ├── TaskCalendar.tsx    # Calendar component with task indicators
│   ├── TaskChart.tsx       # Analytics and charts component
│   ├── TaskForm.tsx        # Task creation/editing form
│   └── TaskList.tsx        # Task listing and management
├── store/
│   ├── index.ts           # Redux store configuration
│   └── tasksSlice.ts      # Task state management
├── App.tsx                # Main application component
├── main.tsx              # Application entry point
├── index.css             # Global styles
└── vite-env.d.ts         # TypeScript declarations
```

## 🔧 Configuration Files

- **`vite.config.ts`**: Vite build configuration
- **`tailwind.config.js`**: Tailwind CSS configuration
- **`tsconfig.json`**: TypeScript configuration
- **`eslint.config.js`**: ESLint configuration
- **`postcss.config.js`**: PostCSS configuration

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Customization

### Task Categories
The application supports four task categories, each with distinct colors and icons:
- **Success** (Green): Completed or successful tasks
- **Warning** (Orange): Tasks that need attention
- **Error** (Red): Critical or failed tasks
- **Info** (Blue): Informational or general tasks

### Styling
- **Ant Design**: Primary UI components with consistent theming
- **Tailwind CSS**: Utility-first styling for custom components
- **Responsive Design**: Mobile-first approach with breakpoints

### State Management
- **Redux Toolkit**: Centralized state management
- **Persistent State**: Tasks are stored in browser memory (can be extended with localStorage)
- **Immutable Updates**: Safe state updates using Redux Toolkit

## 🔄 Data Flow

1. **User Actions**: UI interactions trigger Redux actions
2. **State Updates**: Redux reducers update the application state
3. **Component Re-renders**: React components re-render based on state changes
4. **Data Persistence**: Currently in-memory (can be extended for backend integration)

## 🚧 Future Enhancements

- **Data Persistence**: Add localStorage or backend integration
- **Task Priorities**: Implement priority levels for tasks
- **Recurring Tasks**: Support for recurring task patterns
- **Task Search**: Search functionality for finding specific tasks
- **Export/Import**: Export tasks to various formats
- **Team Collaboration**: Multi-user support and task sharing
- **Notifications**: Browser notifications for upcoming tasks
- **Dark Mode**: Theme switching capability

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**: Ensure all dependencies are installed with `npm install`
2. **TypeScript Errors**: Check that TypeScript configuration is correct
3. **Styling Issues**: Verify Tailwind CSS and Ant Design are properly configured
4. **State Issues**: Clear browser cache and restart development server

### Development Tips

- Use React DevTools for debugging component state
- Use Redux DevTools for monitoring state changes
- Check browser console for runtime errors
- Ensure Node.js version compatibility

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

For questions, issues, or contributions, please open an issue on the GitHub repository.

---

**Happy Task Managing! 📋✨**

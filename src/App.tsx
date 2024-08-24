import React from 'react';
import Dashboard from './pages/Dashboard';
import { Provider } from 'react-redux';
import store from './context/TaskContext';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from './theme';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <ThemeProvider theme={ lightTheme}>
          <Dashboard />
        </ThemeProvider>
      </DndProvider>
    </Provider>
  );
};

export default App;

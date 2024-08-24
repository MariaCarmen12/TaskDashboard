import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { lightTheme } from '../theme';
import TaskForm from '../components/TaskForm';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { RootState } from '../context/TaskContext';

// Mock store setup
const mockStore = configureStore([]);
const initialState: RootState = {
  tasks: {
    tasks: [],
    filteredTasks: [],
  },
};
let store:any;

const mockTasks = [
  {
    id: '1',
    title: 'Test Task 1',
    description: 'Description 1',
    priority: 'High',
    completed: false,
  },
  {
    id: '2',
    title: 'Test Task 2',
    description: 'Description 2',
    priority: 'Medium',
    completed: false,
  },
];

beforeEach(() => {
  store = mockStore({
    ...initialState,
    tasks: {
      tasks: mockTasks,
      filteredTasks: mockTasks,
    },
  });
});

// Renderiza el formulario y verifica si los elementos están presentes
test('renders TaskForm component', () => {
  render(
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <TaskForm />
      </ThemeProvider>
    </Provider>
  );
  
  // Verifica que el título esté presente
  expect(screen.getByText(/Create Your Next Task!/i)).toBeInTheDocument();

  // Verifica la existencia de campos de entrada y botones
  expect(screen.getByLabelText(/Task Title/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Priority/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Add Task/i })).toBeInTheDocument();
});

// Verifica si el formulario maneja el cambio de valores correctamente
test('handles input changes', () => {
  render(
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <TaskForm />
      </ThemeProvider>
    </Provider>
    
  );

  fireEvent.change(screen.getByLabelText(/Task Title/i), { target: { value: 'New Task' } });
  expect(screen.getByLabelText(/Task Title/i)).toHaveValue('New Task');
});

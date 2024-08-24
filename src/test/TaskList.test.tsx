import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TaskList from '../components/TaskList';
import { RootState } from '../context/TaskContext';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from '../theme';


const theme= lightTheme


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

describe('TaskList Component', () => {
  it('renders TaskList with tasks', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <TaskList />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    expect(screen.getByText('Test Task 2')).toBeInTheDocument();
  });

  it('shows NoTasksMessage when there are no tasks', () => {
    store = mockStore({
      ...initialState,
      tasks: {
        tasks: [],
        filteredTasks: [],
      },
    });

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <TaskList />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('No tasks available')).toBeInTheDocument(); // Assuming 'NoTasksMessage' has this text
  });

  it('opens edit modal when edit button is clicked', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <TaskList />
        </ThemeProvider>
      </Provider>
    );

    fireEvent.click(screen.getAllByLabelText('edit')[0]);
    expect(screen.getByText('Edit Task')).toBeInTheDocument(); // Assuming the EditTaskModal has this title
  });

  it('opens delete confirmation dialog when delete button is clicked', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <TaskList />
        </ThemeProvider>
      </Provider>
    );

    fireEvent.click(screen.getAllByLabelText('delete')[0]);
    expect(screen.getByText('Are you sure you want to delete this task? This action cannot be undone.')).toBeInTheDocument(); // Assuming this text in ConfirmDeleteDialog
  });

  it('dispatches deleteTask action when delete is confirmed', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <TaskList />
        </ThemeProvider>
      </Provider>
    );

    fireEvent.click(screen.getAllByLabelText('delete')[0]);
    fireEvent.click(screen.getByText('Delete')); 

    const actions = store.getActions();
    expect(actions[1].type).toEqual('tasks/deleteTask');
  });

  it('handles drag and drop reordering of tasks', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <TaskList />
        </ThemeProvider>
      </Provider>
    );

    const taskItems = screen.getAllByRole('button');

    // Simulate drag and drop
    fireEvent.dragStart(taskItems[0]);
    fireEvent.dragEnter(taskItems[1]);
    fireEvent.drop(taskItems[1]);

    const actions = store.getActions();
    expect(actions[0].type).toEqual('tasks/reorderTasks');
  });
});

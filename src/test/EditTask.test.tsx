import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EditTaskModal from '../components/EditTaskModal';
import { Task } from '../interfaces/taskTypes';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../theme';


const theme= lightTheme

const mockStore = configureStore([]);

const mockTask: Task = {
  id: '1',
  title: 'Test Task',
  description: 'Test Description',
  priority: 'Medium',
  completed: false,
  createdAt: new Date ('01-01-2024')
};

let store: any;
let onCloseMock: jest.Mock;

beforeEach(() => {
  store = mockStore({});
  onCloseMock = jest.fn();
});

describe('EditTaskModal Component', () => {
  it('renders the modal with task data', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <EditTaskModal task={mockTask} open={true} onClose={onCloseMock} />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByLabelText('Title')).toHaveValue(mockTask.title);
    expect(screen.getByLabelText('Description')).toHaveValue(mockTask.description);
    expect(screen.getByLabelText('Priority')).toHaveValue(mockTask.priority);
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('calls onClose when cancel button is clicked', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <EditTaskModal task={mockTask} open={true} onClose={onCloseMock} />
        </ThemeProvider>
      </Provider>
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('dispatches editTask action with updated data when save button is clicked', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <EditTaskModal task={mockTask} open={true} onClose={onCloseMock} />
        </ThemeProvider>
      </Provider>
    );

    const newTitle = 'Updated Task';
    const newDescription = 'Updated Description';

    fireEvent.change(screen.getByLabelText('Title'), { target: { value: newTitle } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: newDescription } });
    fireEvent.change(screen.getByLabelText('Priority'), { target: { value: 'High' } });

    fireEvent.click(screen.getByText('Save'));

    const actions = store.getActions();
    expect(actions[0].type).toBe('tasks/editTask');
    expect(actions[0].payload).toEqual({
      ...mockTask,
      title: newTitle,
      description: newDescription,
      priority: 'High',
    });

    expect(onCloseMock).toHaveBeenCalled();
  });

  it('does not dispatch editTask action if no task is provided', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <EditTaskModal task={null} open={true} onClose={onCloseMock} />
        </ThemeProvider>
      </Provider>
    );

    fireEvent.click(screen.getByText('Save'));

    const actions = store.getActions();
    expect(actions.length).toBe(0);
    expect(onCloseMock).toHaveBeenCalled();
  });
});

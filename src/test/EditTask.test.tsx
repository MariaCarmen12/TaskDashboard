import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EditTaskModal from '../components/EditTaskModal';
import { editTask } from '../context/TaskContext';


const mockStore = configureStore([]);

describe('EditTaskModal', () => {
  let store: any;
  let task: any;

  beforeEach(() => {
    store = mockStore({
      tasks: [
        {
          id: '1',
          title: 'Test Task',
          description: 'Test Description',
          priority: 'Medium',
          completed: false,
          createdAt: new Date('2024-01-01T00:00:00.000Z'), // Mocking a date
        },
      ],
    });

    task = store.getState().tasks[0];
  });

  it('renders correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <EditTaskModal open={true} task={task} onClose={() => {}} />
      </Provider>
    );

    expect(getByText('Edit Task')).toBeInTheDocument();
  });

  it('handles title change', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <EditTaskModal open={true} task={task} onClose={() => {}} />
      </Provider>
    );

    const titleInput = getByLabelText('Title') as HTMLInputElement;

    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });

    expect(titleInput.value).toBe('Updated Title');
  });

  it('handles description change', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <EditTaskModal open={true} task={task} onClose={() => {}} />
      </Provider>
    );

    const descriptionInput = getByLabelText('Description') as HTMLInputElement;

    fireEvent.change(descriptionInput, { target: { value: 'Updated Description' } });

    expect(descriptionInput.value).toBe('Updated Description');
  });

  it('handles priority change', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <EditTaskModal open={true} task={task} onClose={() => {}} />
      </Provider>
    );

    const prioritySelect = getByLabelText('Priority') as HTMLSelectElement;

    fireEvent.change(prioritySelect, { target: { value: 'High' } });

    expect(prioritySelect.value).toBe('High');
  });

  it('dispatches editTask action on save', () => {
    const onClose = jest.fn();

    const { getByText } = render(
      <Provider store={store}>
        <EditTaskModal open={true} task={task} onClose={onClose} />
      </Provider>
    );

    fireEvent.click(getByText('Save'));

    const actions = store.getActions();

    expect(actions[0].type).toBe(editTask.type);
    expect(actions[0].payload).toEqual({
      ...task,
      title: task.title,
      description: task.description,
      priority: task.priority,
    });

    expect(onClose).toHaveBeenCalled();
  });
});

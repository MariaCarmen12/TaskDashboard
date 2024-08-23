import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import RootState, { editTask } from '../context/TaskContext'; // Asegúrate de importar el slice correcto
import EditTaskModal from '../components/EditTaskModal'; // Asegúrate de importar tu componente
import { Task } from '../interfaces/taskTypes';


describe('EditTaskModal Component', () => {
  const task: Task = {
    id: '1',
    title: 'Sample Task',
    description: 'Sample Description',
    completed: false,
    priority: 'Medium',
    createdAt: new Date('2024-08-21'),
  };

  test('should render the modal when open', () => {
    render(
      <Provider store={RootState}>
        <EditTaskModal task={task} open={true} onClose={() => {}} />
      </Provider>
    );

    expect(screen.getByLabelText('edit-task-modal-title')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toHaveValue('Sample Task');
    expect(screen.getByLabelText('Description')).toHaveValue('Sample Description');
    expect(screen.getByLabelText('Priority')).toHaveValue('Medium');
  });

  test('should update task fields and call dispatch on save', async () => {
    const mockDispatch = jest.fn();
    jest.spyOn(React, 'useDispatch').mockReturnValue(mockDispatch);

    render(
      <Provider store={RootState}>
        <EditTaskModal task={task} open={true} onClose={() => {}} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Updated Task' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Updated Description' } });
    fireEvent.change(screen.getByLabelText('Priority'), { target: { value: 'High' } });

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        editTask({
          id: '1',
          title: 'Updated Task',
          description: 'Updated Description',
          priority: 'High',
          completed: false,
          createdAt:  new Date('2024-08-21')
        })
      );
    });
  });

  test('should call onClose when Cancel is clicked', () => {
    const onClose = jest.fn();

    render(
      <Provider store={RootState}>
        <EditTaskModal task={task} open={true} onClose={onClose} />
      </Provider>
    );

    fireEvent.click(screen.getByText('Cancel'));

    expect(onClose).toHaveBeenCalled();
  });
});

// TaskList.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import TaskList from '../components/TaskList';
import '@testing-library/jest-dom';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { configureStore } from '@reduxjs/toolkit';
import store from '../context/TaskContext';


const mockStore = createStore(store, {
  tasks: {
    tasks: [
      { id: 1, title: 'Test Task 1', description: 'Task description 1', priority: 'High', completed: false },
      { id: 2, title: 'Test Task 2', description: 'Task description 2', priority: 'Medium', completed: false },
    ],
    filteredTasks: [
      { id: 1, title: 'Test Task 1', description: 'Task description 1', priority: 'High', completed: false },
      { id: 2, title: 'Test Task 2', description: 'Task description 2', priority: 'Medium', completed: false },
    ],
    aux: [],
  },
});

describe('TaskList Component', () => {
  it('should render correctly with tasks', () => {
    render(
      <Provider store={mockStore}>
        <TaskList />
      </Provider>
    );

    // Verificar que las tareas se renderizan correctamente
    expect(screen.getByText(/Test Task 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Task 2/i)).toBeInTheDocument();
  });

  it('should open edit modal on edit button click', async () => {
    render(
      <Provider store={mockStore}>
        <TaskList />
      </Provider>
    );

    // Simular clic en el botón de editar
    fireEvent.click(screen.getAllByLabelText(/edit/i)[0]);
    await waitFor(() => {
      // Verificar si el modal de edición se abre correctamente
      expect(screen.getByText(/Edit Task/i)).toBeInTheDocument();
    });
  });

  it('should open delete dialog on delete button click', async () => {
    render(
      <Provider store={mockStore}>
        <TaskList />
      </Provider>
    );

    // Simular clic en el botón de eliminar
    fireEvent.click(screen.getAllByLabelText(/delete/i)[0]);
    await waitFor(() => {
      // Verificar si el diálogo de confirmación se abre correctamente
      expect(screen.getByText(/Confirm Delete/i)).toBeInTheDocument();
    });
  });

  it('should handle drag and drop correctly', async () => {
    // Aquí necesitarás implementar una simulación del comportamiento de drag and drop.
    // Puede ser más complejo y requerir la integración de react-beautiful-dnd en el entorno de pruebas.
    render(
      <Provider store={mockStore}>
        <DragDropContext onDragEnd={() => { }}>
          <Droppable droppableId="taskListDroppable">
            {(provided) => (
              <TaskList />
            )}
          </Droppable>
        </DragDropContext>
      </Provider>
    );

    // Simular y verificar el comportamiento de arrastre y caída
  });
});

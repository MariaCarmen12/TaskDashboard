import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { lightTheme } from '../theme';
import TaskForm from '../components/TaskForm';

// Renderiza el formulario y verifica si los elementos están presentes
test('renders TaskForm component', () => {
  render(
    <ThemeProvider theme={lightTheme}>
      <TaskForm />
    </ThemeProvider>
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
    <ThemeProvider theme={lightTheme}>
      <TaskForm />
    </ThemeProvider>
  );

  fireEvent.change(screen.getByLabelText(/Task Title/i), { target: { value: 'New Task' } });
  expect(screen.getByLabelText(/Task Title/i)).toHaveValue('New Task');
});

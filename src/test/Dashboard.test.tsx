import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../context/TaskContext';
import Dashboard from '../pages/Dashboard';

// Mocking child components
jest.mock('../components/TaskForm', () => () => <div>TaskForm</div>);
jest.mock('../components/TaskList', () => () => <div>TaskList</div>);
jest.mock('../components/FilterSortOptions', () => () => <div>FilterSortOptions</div>);
jest.mock('../components/Header', () => ({
  Header: ({ isDarkMode, handleThemeToggle }: { isDarkMode: boolean; handleThemeToggle: () => void }) => (
    <div>
      <span>Header</span>
      <button onClick={handleThemeToggle}>{isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</button>
    </div>
  )
}));

describe('Dashboard Component', () => {
  it('renders the dashboard with all components', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('TaskForm')).toBeInTheDocument();
    expect(screen.getByText('TaskList')).toBeInTheDocument();
    expect(screen.getByText('FilterSortOptions')).toBeInTheDocument();
  });

  it('toggles between light and dark mode', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    const toggleButton = screen.getByRole('button', { name: /Switch to Dark Mode/i });

    // Initially in light mode
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveTextContent('Switch to Dark Mode');

    // Toggle to dark mode
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent('Switch to Light Mode');

    // Toggle back to light mode
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent('Switch to Dark Mode');
  });
});

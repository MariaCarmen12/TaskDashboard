import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import configureStore from 'redux-mock-store';
import FilterSortOptions from '../components/FilterSortOptions';
import { lightTheme } from '../theme'; 
import { RootState } from '../context/TaskContext';

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

describe('FilterSortOptions Component', () => {
  const setup = () =>
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <FilterSortOptions />
        </ThemeProvider>
      </Provider>
    );

  it('renders correctly', () => {
    setup();
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByLabelText('Sort by')).toBeInTheDocument();
    expect(screen.getByLabelText('Filter by Priority')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });

  it('changes sort option', () => {
    setup();
    const filterSelect = screen.getAllByRole('combobox');
    fireEvent.mouseDown(filterSelect[0]);
    const listbox = screen.getAllByRole('option')
    fireEvent.click(listbox[1]);
    expect(filterSelect[0]).toHaveTextContent('Priority');
    // Further test if the correct action was dispatched if needed
  });

  it('changes filter option', () => {
    setup();
    const filterSelect = screen.getAllByRole('combobox');
    fireEvent.mouseDown(filterSelect[1]);
    const listbox = screen.getAllByRole('option')
    fireEvent.click(listbox[1]);
    expect(filterSelect[1]).toHaveTextContent('High');
    // Further test if the correct action was dispatched if needed
  });
});

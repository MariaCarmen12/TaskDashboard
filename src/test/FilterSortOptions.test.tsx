import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import configureStore from 'redux-mock-store';
import FilterSortOptions from '../components/FilterSortOptions';
import { lightTheme } from '../theme'; 

const mockStore = configureStore([]);
const store = mockStore({});

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
    const sortSelect = screen.getByLabelText('Sort by');
    fireEvent.change(sortSelect, { target: { value: 'Priority' } });
    expect(sortSelect).toHaveValue('Priority');
    // Further test if the correct action was dispatched if needed
  });

  it('changes filter option', () => {
    setup();
    const filterSelect = screen.getByLabelText('Filter by Priority');
    fireEvent.change(filterSelect, { target: { value: 'High' } });
    expect(filterSelect).toHaveValue('High');
    // Further test if the correct action was dispatched if needed
  });
});

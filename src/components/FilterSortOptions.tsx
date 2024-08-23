import React, { useState, useEffect } from 'react';
import {  MenuItem,  Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { sortTasks, filterTasksByPriority, addTask, editTask, RootState } from '../context/TaskContext';
import { useTheme } from '@mui/material/styles';

import { Container, FilterIcon, FilterTitle, StyledTextField } from './Styles/FilterSortOptionsStyles';

const FilterSortOptions: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [sortOption, setSortOption] = useState<'Date' | 'Priority'>('Date');
  const [filterOption, setFilterOption] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');

  const tasks = useSelector((state: RootState) => state.tasks.tasks); // Lista completa de tareas
  const filteredTasks = useSelector((state: RootState) => state.tasks.filteredTasks); // Tareas filtradas
  console.log("Se actualizaaan",tasks, filteredTasks)

  
  useEffect(() => {
    dispatch(filterTasksByPriority(filterOption));
    dispatch(sortTasks(sortOption));
  }, [addTask || editTask]);

 
  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSortOption = e.target.value as 'Date' | 'Priority';
    setSortOption(newSortOption);
    dispatch(sortTasks(newSortOption));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterOption = e.target.value as 'All' | 'High' | 'Medium' | 'Low';
    setFilterOption(newFilterOption);
    dispatch(filterTasksByPriority(newFilterOption));
  };

  return (
    <Container theme={theme}>
      <Box display="flex" alignItems="center">
        <FilterIcon theme={theme} />
        <FilterTitle variant="h6" theme={theme}>
          Filters
        </FilterTitle>
      </Box>

      <StyledTextField
        select
        label="Sort by"
        value={sortOption}
        onChange={handleSortChange}
        theme={theme}
      >
        <MenuItem value="Date">Date</MenuItem>
        <MenuItem value="Priority">Priority</MenuItem>
      </StyledTextField>

      <StyledTextField
        select
        label="Filter by Priority"
        value={filterOption}
        onChange={handleFilterChange}
        theme={theme}
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="High">High</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="Low">Low</MenuItem>
      </StyledTextField>
    </Container>
  );
};

export default FilterSortOptions;



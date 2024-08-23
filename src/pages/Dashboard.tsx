import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Grid, Box } from '@mui/material';
import { lightTheme, darkTheme } from '../theme';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import FilterSortOptions from '../components/FilterSortOptions';
import { Provider } from 'react-redux';
import store from '../context/TaskContext';
import { Header } from '../components/Header';

// Definición de los tipos para los props
interface DashboardProps {}

// Componente funcional Dashboard
const Dashboard: React.FC<DashboardProps> = () => {
  // Estado para manejar el modo oscuro
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Función para alternar entre modo claro y oscuro
  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Estilos en línea para los componentes
  const style = {
    grid: {
      padding: '10px',
      width: { xs: '100%', md: 'auto' },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px'
    }
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Box sx={{ width: '100%', height: '100%' }}>
          <Header
            isDarkMode={isDarkMode}
            handleThemeToggle={handleThemeToggle}
          />
          <Grid container spacing={2} sx={{ padding: '20px' }}>
            <Grid item xs={12} md={4} sx={style.grid}>
              <TaskForm />
            </Grid>
            <Grid item xs={12} md={8} sx={style.grid}>
              <FilterSortOptions />
              <TaskList />
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </Provider>
  );
};

export default Dashboard;

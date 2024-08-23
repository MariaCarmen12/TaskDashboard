import { createTheme } from '@mui/material/styles';

// Definición de breakpoints
const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};

// Tema claro
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Azul principal
      contrastText: '#ffffff', // Texto en contraste para botones primarios
    },
    secondary: {
      main: '#9c27b0', // Morado secundario
      light: "#F1F1F1"
    },
    background: {
      default: '#f4f6f8', // Color de fondo principal
      paper: '#ffffff',   // Color de fondo para elementos como tarjetas
    },
    text: {
      primary: '#333333', // Color de texto principal
      secondary: '#666666', // Color de texto secundario
    },
    error: {
      main: '#d32f2f', // Rojo para errores
    },
    warning: {
      main: '#ffa000', // Amarillo para advertencias
    },
    info: {
      main: '#0288d1', // Azul para información
    },
    success: {
      main: '#2e7d32', // Verde para éxito
    },
  },
  breakpoints,
});

// Tema oscuro
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Azul claro para modo oscuro
      contrastText: '#000000', // Texto en contraste para botones primarios
    },
    secondary: {
      main: '#ce93d8', // Morado claro para modo oscuro
      light: "#1E1E1E"
    },
    background: {
      default: '#121212', // Fondo oscuro principal
      paper: '#1e1e1e',   // Fondo para elementos como tarjetas
    },
    text: {
      primary: '#ffffff', // Texto claro en modo oscuro
      secondary: '#b0bec5', // Texto secundario en modo oscuro
    },
    error: {
      main: '#f44336', // Rojo para errores
    },
    warning: {
      main: '#ffb74d', // Amarillo para advertencias
    },
    info: {
      main: '#29b6f6', // Azul para información
    },
    success: {
      main: '#66bb6a', // Verde para éxito
    },
  },
  breakpoints,
});

export { lightTheme, darkTheme };

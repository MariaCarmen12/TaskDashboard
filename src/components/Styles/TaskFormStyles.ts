import { Box, styled, TextField, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface ThemeProps {
  theme: any;
}

export const FormContainer = styled(Box)<ThemeProps>`
  background-color: ${({ theme }) => theme.palette.secondary.light};
  padding: 30px;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows[4]};
  max-width: 390px;
  margin: 0 auto;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  transition: box-shadow 0.3s ease-in-out;
  position: ${({ theme }) => (theme.breakpoints.down('md') ? 'static' : 'fixed')};
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows[8]};
  }
`;

export const FormTitle = styled(Typography)<ThemeProps>`
  text-align: center;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: bold;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;

 export const StyledTextField = styled(TextField)<ThemeProps>`
width: 100%; /* Cambiado a 100% para usar todo el ancho del contenedor padre */
margin-right: 20px;

& .MuiInputBase-root {
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 4px;
}

& .MuiFormHelperText-root {
  color: ${({ theme }) => theme.palette.error.main}; /* Estilo para el helper text */
}

& .MuiFormControl-root {
  margin-top: 1 /* Espaciado superior */
}

& .MuiFormLabel-root {
  color: ${({ theme }) => theme.palette.text.primary}; /* Estilo para la etiqueta */
}

& .MuiFormHelperText-contained {
  color: ${({ theme }) => theme.palette.text.secondary}; /* Estilo para helper text contenido */
}

& .MuiFormHelperText-contained.Mui-error {
  color: ${({ theme }) => theme.palette.error.main}; /* Estilo para el texto de error */
}
`;

export const SubmitButton = styled(Button)<ThemeProps>`
  margin-top: 20px;
  height: 56px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }
`;

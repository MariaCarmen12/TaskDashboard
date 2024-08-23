
import styled from 'styled-components';
import { Box, Typography, TextField, Button } from '@mui/material';

interface ThemeProps {
  theme: any; 
}

export const ModalContainer = styled(Box)<ThemeProps>`
  padding: 16px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  margin: auto;
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled(Typography)<ThemeProps>`
  margin-bottom: 16px;
  color: ${({ theme }) => theme.palette.text.primary};
  font-weight: bold;
`;

export const StyledTextField = styled(TextField)<ThemeProps>`
  & .MuiInputLabel-root {
    color: ${({ theme }) => theme.palette.text.secondary};
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: ${({ theme }) => theme.palette.text.secondary};
    }
    &:hover fieldset {
      border-color: ${({ theme }) => theme.palette.primary.main};
    }
    &.Mui-focused fieldset {
      border-color: ${({ theme }) => theme.palette.primary.main};
    }
  }
`;

export const ButtonContainer = styled(Box)<ThemeProps>`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  width: 100%;
  justify-content: flex-end;
`;

export const SaveButton = styled(Button)<ThemeProps>`
  flex-grow: 1;
  max-width: 150px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }
`;

export const CancelButton = styled(Button)<ThemeProps>`
  flex-grow: 1;
  max-width: 150px;
  &:hover {
    border-color: ${({ theme }) => theme.palette.secondary.main};
    color: ${({ theme }) => theme.palette.secondary.main};
  }
`;

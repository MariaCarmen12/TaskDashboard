import { Box, styled, TextField, Typography } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';

interface ContainerProps {
  theme: any;
}
export const Container = styled(Box)<ContainerProps>`
  padding: 16px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows[2]};
  margin-top: 20px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FilterIcon = styled(FilterListIcon)`
  margin-right: 8px;
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const FilterTitle = styled(Typography)`
  margin-right: 20px;
  color: ${({ theme }) => theme.palette.text.primary};
  font-weight: bold;
`;

export const StyledTextField = styled(TextField)`
  width: 200px;
  margin-right: 20px;

  & .MuiInputBase-root {
    background-color: ${({ theme }) => theme.palette.background.default};
    border-radius: 4px;
  }
`;
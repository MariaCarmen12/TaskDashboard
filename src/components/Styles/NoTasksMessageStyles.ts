import { Box, styled } from '@mui/material';


interface ThemeProps {
  theme: any;
}

export const BoxContainer = styled(Box)<ThemeProps>`
 display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  background-color: ${({ theme }) => theme.palette.background.default};
  border-radius: 8px;
  text-align: center;
`;
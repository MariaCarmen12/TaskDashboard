import React from 'react';
import {  Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import { BoxContainer } from './Styles/NoTasksMessageStyles';

const NoTasksMessage: React.FC = () => {
  const theme = useTheme();

  return (
    <BoxContainer theme={theme}>
      <AssignmentLateIcon sx={{ fontSize: 60, color: theme.palette.text.secondary, mb: 2 }} />
      <Typography
        variant="h6"
        sx={{
          color: theme.palette.text.secondary,
          fontWeight: 'bold',
          mb: 1,
        }}
      >
        No tasks available
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.secondary,
        }}
      >
        You don&apos;t have any tasks at the moment. Add some tasks to get started!
      </Typography>
    </BoxContainer>
  );
};

export default NoTasksMessage;

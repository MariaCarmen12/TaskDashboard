// TaskListStyles.ts
import styled from 'styled-components';
import { ListItem, Box, Typography } from '@mui/material';

interface TaskItemProps {
  isDragging: boolean;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
}

export const TaskListContainer = styled(Box)`
  padding: 16px;
  width: 100%;
  margin: 0 auto;
  align-items: center;
`;

export const TaskListTitle = styled(Typography)<{ textColor?: string; borderColor?: string }>`
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 2rem;
  font-weight: bold;
  color: ${({ textColor }) => textColor || 'inherit'};
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  border-bottom: 2px solid ${({ borderColor }) => borderColor || 'inherit'};
  padding-bottom: 8px;
  border-radius: 8px;
  display: inline-block;
  width: 100%;
`;

export const TaskItem = styled(ListItem)<TaskItemProps>`
  opacity: ${({ isDragging }) => (isDragging ? 0.8 : 1)};
  background-color: ${({ bgColor }) => bgColor || '#fff'};
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  box-shadow: 1
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 3
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 8px;
  }
`;

export const TaskDetailsBox = styled(Box)`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

export const TaskActionsBox = styled(Box)`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  margin-right: 10px;

  @media (max-width: 600px) {
    margin-top: 4px;
  }
`;

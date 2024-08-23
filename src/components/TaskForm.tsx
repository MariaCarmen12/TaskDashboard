import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';
import { addTask } from '../context/TaskContext';
import { Task } from '../interfaces/taskTypes';
import { MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FormContainer, FormTitle, StyledTextField, SubmitButton } from './Styles/TaskFormStyles';


const TaskForm: React.FC = () => {
  const theme = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});
  const dispatch = useDispatch();

  const handleSubmit = () => {
    let hasErrors = false;
    const newErrors: { title?: string; description?: string } = {};

    if (!title) {
      newErrors.title = 'Task title is required';
      hasErrors = true;
    }
    if (!description) {
      newErrors.description = 'Description is required';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      priority,
      completed: false,
      createdAt: new Date(),
    };
    dispatch(addTask(newTask));
    setTitle('');
    setDescription('');
    setErrors({});
  };

  return (
    <FormContainer
      component="form"
      onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
      theme={theme}
      sx={{position: { xs: 'static', md: 'fixed' },}}
    >
      <FormTitle variant="h4"   theme={theme}>Create Your Next Task!</FormTitle>

      <StyledTextField
        label="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        required
        error={!!errors.title}
        helperText={errors.title}
        theme={theme}
      />
      <StyledTextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={3}
        error={!!errors.description}
        helperText={errors.description}
        theme={theme}
      />
      <StyledTextField
        select
        label="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value as 'High' | 'Medium' | 'Low')}
        fullWidth
        margin="normal"
        theme={theme}
      >
        <MenuItem value="High">High</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="Low">Low</MenuItem>
      </StyledTextField>
      <SubmitButton
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        startIcon={<AddIcon />}
        fullWidth
        size="large"
        theme={theme}
      >
        Add Task
      </SubmitButton>
    </FormContainer>
  );
};

export default TaskForm;

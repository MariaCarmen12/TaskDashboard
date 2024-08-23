import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Task } from '../interfaces/taskTypes';
import { editTask } from '../context/TaskContext';

interface EditTaskModalProps {
  task: Task | null;
  open: boolean;
  onClose: () => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, open, onClose }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [priority, setPriority] = useState(task?.priority || 'Medium');
  const dispatch = useDispatch();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
    }
  }, [task]);

  const handleSave = () => {
    if (task) {
      dispatch(editTask({ ...task, title, description, priority }));
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="edit-task-modal-title">
      <Box
        sx={{
          padding: 4,
          backgroundColor: 'white',
          borderRadius: 2,
          width: '90%',
          maxWidth: 600,
          margin: 'auto',
          marginTop: '10vh',
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          id="edit-task-modal-title"
          variant="h6"
          component="h2"
          sx={{
            marginBottom: 2,
            color: (theme) => theme.palette.text.primary,
            fontWeight: 'bold',
          }}
        >
          Edit Task
        </Typography>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          sx={{
            '& .MuiInputLabel-root': {
              color: (theme) => theme.palette.text.secondary,
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: (theme) => theme.palette.text.secondary,
              },
              '&:hover fieldset': {
                borderColor: (theme) => theme.palette.primary.main,
              },
              '&.Mui-focused fieldset': {
                borderColor: (theme) => theme.palette.primary.main,
              },
            },
          }}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          variant="outlined"
          sx={{
            '& .MuiInputLabel-root': {
              color: (theme) => theme.palette.text.secondary,
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: (theme) => theme.palette.text.secondary,
              },
              '&:hover fieldset': {
                borderColor: (theme) => theme.palette.primary.main,
              },
              '&.Mui-focused fieldset': {
                borderColor: (theme) => theme.palette.primary.main,
              },
            },
          }}
        />
        <TextField
          select
          label="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'High' | 'Medium' | 'Low')}
          fullWidth
          margin="normal"
          variant="outlined"
          sx={{
            '& .MuiInputLabel-root': {
              color: (theme) => theme.palette.text.secondary,
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: (theme) => theme.palette.text.secondary,
              },
              '&:hover fieldset': {
                borderColor: (theme) => theme.palette.primary.main,
              },
              '&.Mui-focused fieldset': {
                borderColor: (theme) => theme.palette.primary.main,
              },
            },
          }}
        >
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </TextField>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            marginTop: 2,
            width: '100%',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{
              flexGrow: 1,
              maxWidth: 150,
              backgroundColor: (theme) => theme.palette.primary.main,
              '&:hover': {
                backgroundColor: (theme) => theme.palette.primary.dark,
              },
            }}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClose}
            sx={{
              flexGrow: 1,
              maxWidth: 150,
              '&:hover': {
                borderColor: (theme) => theme.palette.secondary.main,
                color: (theme) => theme.palette.secondary.main,
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditTaskModal;

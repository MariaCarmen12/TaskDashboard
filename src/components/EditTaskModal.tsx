import React, { useState, useEffect } from 'react';
import { Modal, MenuItem, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Task } from '../interfaces/taskTypes';
import { editTask } from '../context/TaskContext';
import { ModalContainer, Title, StyledTextField, ButtonContainer, SaveButton, CancelButton } from '../components/Styles/EditTaskModalStyles';

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
  const theme = useTheme();

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
      <ModalContainer theme={theme}>
        <Title id="edit-task-modal-title" variant="h6"  theme={theme}>
          Edit Task
        </Title>
        <StyledTextField
          label="Title"
          value={title}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          theme={theme}
        />
        <StyledTextField
          label="Description"
          value={description}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          variant="outlined"
          theme={theme}
        />
        <StyledTextField
          select
          label="Priority"
          value={priority}
          onChange={(e: { target: { value: string; }; }) => setPriority(e.target.value as 'High' | 'Medium' | 'Low')}
          fullWidth
          margin="normal"
          variant="outlined"
          theme={theme}
        >
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </StyledTextField>
        <ButtonContainer theme={theme}>
          <SaveButton
            variant="contained"
            color="primary"
            onClick={handleSave}
            theme={theme}
          >
            Save
          </SaveButton>
          <CancelButton
            variant="outlined"
            color="secondary"
            onClick={onClose}
            theme={theme}
          >
            Cancel
          </CancelButton>
        </ButtonContainer>
      </ModalContainer>
    </Modal>
  );
};

export default EditTaskModal;

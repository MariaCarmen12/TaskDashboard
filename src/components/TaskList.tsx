import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../context/TaskContext';
import { Box, Checkbox, IconButton, ListItemText, Typography, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { BarChart } from '@mui/icons-material';
import { deleteTask, toggleComplete, reorderTasks } from '../context/TaskContext';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import EditTaskModal from './EditTaskModal';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import { Task } from '../interfaces/taskTypes';
import NoTasksMessage from './NoTasksMessage';
import { TaskListContainer, TaskListTitle, TaskItem, TaskDetailsBox, TaskActionsBox } from './Styles/TaskListStyles';

const TaskList: React.FC = () => {
  const theme = useTheme();
  const tasks = useSelector((state: RootState) => state.tasks.filteredTasks);
  const dispatch = useDispatch();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  const getPriorityIcon = (priority: 'High' | 'Medium' | 'Low') => {
    switch (priority) {
      case 'High':
        return <BarChart sx={{ color: theme.palette.error.main }} />;
      case 'Medium':
        return <BarChart sx={{ color: theme.palette.warning.main }} />;
      case 'Low':
        return <BarChart sx={{ color: theme.palette.success.main }} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      dispatch(reorderTasks(parsedTasks));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(tasks);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);
    dispatch(reorderTasks(reorderedItems));
  };

  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (taskId: number) => {
    setTaskToDelete(taskId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      dispatch(deleteTask(taskToDelete.toString()));
      setDeleteDialogOpen(false);
      setTaskToDelete(null);
    }
  };

  return (
    <>
      <TaskListContainer>
        <TaskListTitle
          variant="h4"
          gutterBottom
          textColor={theme.palette.primary.main}
          borderColor={theme.palette.primary.main}
        >
          Task List
        </TaskListTitle>

        {tasks.length === 0 ? (
          <NoTasksMessage />
        ) : (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="taskListDroppable">
              {(provided) => (
                <Box {...provided.droppableProps} ref={provided.innerRef} sx={{ width: '100%' }}>
                  {tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided, snapshot) => (
                        <TaskItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          isDragging={snapshot.isDragging}
                          bgColor={theme.palette.background.paper}
                        >
                          <Checkbox
                            checked={task.completed}
                            onChange={() => dispatch(toggleComplete(task.id))}
                            aria-label={`Mark task ${task.title} as completed`}
                          />
                          <TaskDetailsBox>
                            <Box sx={{ mr: 1 }}>{getPriorityIcon(task.priority)}</Box>
                            <ListItemText
                              primary={<Typography variant="h6" sx={{ fontWeight: 'bold' }}>{task.title}</Typography>}
                              secondary={
                                <Box>
                                  <Typography
                                    variant="body2"
                                    sx={{ color: theme.palette.text.secondary, whiteSpace: 'normal', wordBreak: 'break-word' }}
                                  >
                                    {task.description}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">Priority: {task.priority}</Typography>
                                </Box>
                              }
                            />
                          </TaskDetailsBox>
                          <TaskActionsBox>
                            <IconButton
                              edge="end"
                              aria-label="edit"
                              onClick={() => handleEditClick(task)}
                              sx={{ color: theme.palette.primary.main }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => handleDeleteClick(task.id as unknown as number)}
                              sx={{ color: theme.palette.error.main }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TaskActionsBox>
                        </TaskItem>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </TaskListContainer>

      <EditTaskModal task={selectedTask} open={editModalOpen} onClose={() => setEditModalOpen(false)} />

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default TaskList;

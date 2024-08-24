import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../interfaces/taskTypes';

interface TaskState {
  tasks: Task[];
  filteredTasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
  filteredTasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      state.filteredTasks = state.tasks;
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      const indexaux = state.filteredTasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1 && indexaux !== -1) {
        state.tasks[index] = action.payload;
        state.filteredTasks[indexaux] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      state.filteredTasks = state.tasks;
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const index = state.filteredTasks.findIndex(task => task.id === action.payload);
      const indexaux = state.tasks.findIndex(task => task.id === action.payload);
      if (index !== -1 && indexaux !== -1) {
        state.tasks[indexaux].completed = !state.tasks[indexaux].completed;
        state.filteredTasks[index].completed = !state.filteredTasks[index].completed;
      }
    },
    sortTasks: (state, action: PayloadAction<string>) => {
      if (action.payload === 'Date') {
        state.filteredTasks = state.tasks.slice().sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        });
      } else if (action.payload === 'Priority') {
        const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
        state.filteredTasks = state.tasks.slice().sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      }
    },
    filterTasksByPriority: (state, action: PayloadAction<string>) => {
      const priority = action.payload;
      state.filteredTasks = state.tasks.filter(task => priority === 'All' || task.priority === priority);
    },
    reorderTasks: (state, action: PayloadAction<Task[]>) => {
      const reorderedTasks = action.payload;
      state.filteredTasks = reorderedTasks;
      state.tasks = reorderedTasks;
      state.tasks = state.tasks.map(task => reorderedTasks.find(reorderedTask => reorderedTask.id === task.id) || task);
    },
    cleanTask: (state) => {
      state.filteredTasks = [];
      state.tasks = [];
    }
  },
});

export const { addTask, editTask, deleteTask, toggleComplete, sortTasks, filterTasksByPriority, reorderTasks, cleanTask } = taskSlice.actions;

const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

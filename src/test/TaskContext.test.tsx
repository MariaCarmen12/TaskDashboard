import store, {
    addTask,
    editTask,
    deleteTask,
    toggleComplete,
    sortTasks,
    filterTasksByPriority,
    reorderTasks,
    RootState,
    cleanTask
   
  } from '../context/TaskContext';
  import { Task } from '../interfaces/taskTypes';
  interface TaskState {
    tasks: Task[];
    filteredTasks: Task[];
   
  }

  
  describe('taskSlice', () => {
    const initialTask: Task = {
      id: '1',
      title: 'Test Task',
      description: 'This is a test task',
      priority: 'Medium',
      completed: false,
      createdAt: new Date(),
    };
  
    it('should handle initial state', () => {
      const state: TaskState = store.getState().tasks;
      expect(state.tasks).toEqual([]);
      expect(state.filteredTasks).toEqual([]);
    });
  
    it('should handle adding a task', () => {
      store.dispatch(addTask(initialTask));
      const state: TaskState = store.getState().tasks;
      expect(state.tasks).toHaveLength(1);
      expect(state.tasks[0]).toEqual(initialTask);
      expect(state.filteredTasks).toEqual(state.tasks);
    });
  
    it('should handle editing a task', () => {
      const updatedTask: Task = { ...initialTask, title: 'Updated Test Task' };
      store.dispatch(editTask(updatedTask));
      const state: TaskState = store.getState().tasks;
      expect(state.tasks[0].title).toBe('Updated Test Task');
      expect(state.filteredTasks[0].title).toBe('Updated Test Task');
    });
  
    it('should handle deleting a task', () => {
      store.dispatch(deleteTask(initialTask.id));
      const state: TaskState = store.getState().tasks;
      expect(state.tasks).toHaveLength(0);
      expect(state.filteredTasks).toHaveLength(0);
    });
  
    it('should handle toggling task completion', () => {
      store.dispatch(addTask(initialTask));
      store.dispatch(toggleComplete(initialTask.id));
      let state: TaskState = store.getState().tasks;
      expect(state.tasks[0].completed).toBe(true);
      expect(state.filteredTasks[0].completed).toBe(true);
  
      store.dispatch(toggleComplete(initialTask.id));
      state = store.getState().tasks;
      expect(state.tasks[0].completed).toBe(false);
      expect(state.filteredTasks[0].completed).toBe(false);
    });
  
    it('should handle sorting tasks by date', () => {
      store.dispatch(cleanTask());
      const task1: Task = { ...initialTask, id: '1', createdAt: new Date() };
      const task2: Task = { ...initialTask, id: '2', createdAt: new Date(Date.now() - 86400000) }; // 1 day ago
  
      store.dispatch(addTask(task1));
      store.dispatch(addTask(task2));
  
      store.dispatch(sortTasks('Date'));
      const state: TaskState = store.getState().tasks;
      expect(state.filteredTasks[0].id).toBe('1');
      expect(state.filteredTasks[1].id).toBe('2');
    });
  
    it('should handle sorting tasks by priority', () => {
      store.dispatch(cleanTask());
      const task1: Task = { ...initialTask, id: '1', priority: 'High' };
      const task2: Task = { ...initialTask, id: '2', priority: 'Low' };
      const task3: Task = { ...initialTask, id: '3', priority: 'Medium' };
  
      store.dispatch(addTask(task1));
      store.dispatch(addTask(task2));
      store.dispatch(addTask(task3));
  
      store.dispatch(sortTasks('Priority'));
      const state: TaskState = store.getState().tasks;
      expect(state.filteredTasks[0].id).toBe('1');
      expect(state.filteredTasks[1].id).toBe('3');
      expect(state.filteredTasks[2].id).toBe('2');
    });
  
    it('should handle filtering tasks by priority', () => {
      store.dispatch(cleanTask());
      const task1: Task = { ...initialTask, description: "task 1", id: '1', priority: 'High' };
      const task2: Task = { ...initialTask, description: "task 2", id: '2', priority: 'Low' };
  
      store.dispatch(addTask(task1));
      store.dispatch(addTask(task2));
  
      store.dispatch(filterTasksByPriority('High'));
      let state: TaskState = store.getState().tasks;
      expect(state.filteredTasks).toHaveLength(1);
      expect(state.filteredTasks[0].id).toBe('1');
  
      store.dispatch(filterTasksByPriority('All'));
      state = store.getState().tasks;
      expect(state.filteredTasks).toHaveLength(2);
    });
  
    it('should handle reordering tasks', () => {
      const task1: Task = { ...initialTask, id: '1' };
      const task2: Task = { ...initialTask, id: '2' };
      const task3: Task = { ...initialTask, id: '3' };
  
      store.dispatch(addTask(task1));
      store.dispatch(addTask(task2));
      store.dispatch(addTask(task3));
  
      const reorderedTasks = [task3, task1, task2];
      store.dispatch(reorderTasks(reorderedTasks));
  
      const state: TaskState = store.getState().tasks;
      expect(state.tasks[0].id).toBe('3');
      expect(state.tasks[1].id).toBe('1');
      expect(state.tasks[2].id).toBe('2');
  
      expect(state.filteredTasks[0].id).toBe('3');
      expect(state.filteredTasks[1].id).toBe('1');
      expect(state.filteredTasks[2].id).toBe('2');
    });
  });
  
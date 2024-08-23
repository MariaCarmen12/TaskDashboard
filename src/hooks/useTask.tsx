import { useState, useEffect } from 'react';
import { fetchTasks, saveTask, deleteTask, updateTask } from '../services/api';
import { Task } from '../interfaces/taskTypes';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      const data = await fetchTasks();
      setTasks(data);
    };
    loadTasks();
  }, []);

  const addTask = async (task: Task) => {
    const newTask = await saveTask(task);
    setTasks([...tasks, newTask]);
  };

  const editTask = async (id: string, updatedTask: Task) => {
    const updated = await updateTask(id, updatedTask);
    setTasks(tasks.map((task) => (task.id === id ? updated : task)));
  };

  const removeTask = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return { tasks, addTask, editTask, removeTask };
};

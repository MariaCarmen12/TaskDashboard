import axios from 'axios';
import { Task } from '../interfaces/taskTypes';

const API_URL = 'http://localhost:5000/tasks';

export const fetchTasks = async () => {
  const response = await axios.get<Task[]>(API_URL);
  return response.data;
};

export const saveTask = async (task: Task) => {
  const response = await axios.post<Task>(API_URL, task);
  return response.data;
};

export const deleteTask = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updateTask = async (id: string, updatedTask: Task) => {
  const response = await axios.put<Task>(`${API_URL}/${id}`, updatedTask);
  return response.data;
};

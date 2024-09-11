export interface TaskResponse {
  id: number;
  task: string;
  description: string;
  color: number;
  date: string;
  is_completed: boolean;
  getUserTasks: () => Promise<void>;
}

export interface TaskResponse {
  id: number;
  task: string;
  description: string;
  color: number;
  date: string;
  is_completed: boolean;
}
export interface TaskEdit {
  task: string;
  description: string;
  date: string;
  list?: string;
  is_completed: boolean;
}

export interface User {
  name: string;
  email: string;
}

export interface List {
  id: number;
  name: string;
  userId: string;
  color: Color;
  createdAt: Date;
}

export type Color = 'lime' | 'orange' | 'green' | 'purple' | 'red' | 'yellow' | 'blue';

export interface ListAndTasks {
  id: number;
  name: string;
  userId: string;
  color: string;
  createdAt: Date;
  tasks: TaskResponse[];
}

import mongoose, { Document } from 'mongoose';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
}

export interface TaskDocument extends Task {
  createdAt: Date;
  updatedAt: Date;
}

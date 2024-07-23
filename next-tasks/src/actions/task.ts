'use server';

import { Task } from '@/models/task';
import { redirect } from 'next/navigation';

export interface FormState {
  error: string;
}

export const createTask = async (state: FormState, formData: FormData) => {
  const newTask: Task = {
    id: '1',
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    dueDate: formData.get('dueDate') as string,
    isCompleted: false
  };

  try {
    const response = await fetch(`${process.env.SERVER_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      state.error = 'タスクの作成に失敗しました';
      return state;
    }
  } catch (error) {
    state.error = 'タスクの作成に失敗しました';
    return state;
  }
  redirect('/');
};

export const updateTask = async (
  id: string,
  state: FormState,
  formData: FormData
) => {
  const updateTask: Task = {
    id: '2',
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    dueDate: formData.get('dueDate') as string,
    isCompleted: Boolean(formData.get('isCompleted')),
  };
  try {
  } catch (error) {
    state.error = 'タスクの更新に失敗しました';
    return state;
  }

  redirect('/');
};

export const deleteTask = async (id: string, state: FormState) => {
  try {
    // delete
  } catch (error) {
    state.error = 'タスクの削除に失敗しました';
    return state;
  }

  redirect('/');
};

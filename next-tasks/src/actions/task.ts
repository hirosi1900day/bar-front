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
  try {
    const response = await fetch(`${process.env.SERVER_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: formData.get('title'),
        description: formData.get('description'),
        dueDate: formData.get('dueDate'),
        status: formData.get('isCompleted') == 'on' ?  2 : 0,
      }),
    });

    if (!response.ok) {
      state.error = 'タスクの更新に失敗しました';
      return state;
    }
  } catch (error) {
    state.error = 'タスクの更新に失敗しました';
    return state;
  }

  redirect('/');
};

export const deleteTask = async (id: string, state: FormState) => {
  try {
    // delete
    const response = await fetch(`${process.env.SERVER_URL}/tasks/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      state.error = 'タスクの削除に失敗しました';
      return state;
    }
  } catch (error) {
    state.error = 'タスクの削除に失敗しました';
    return state;
  }

  redirect('/');
};

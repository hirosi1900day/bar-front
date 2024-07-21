import { NextResponse } from 'next/server';
import { TaskDocument } from '@/models/task';

type TaskResponse = {
  message: string;
  tasks: TaskDocument;
}

type ErrorResponse = {
  message: string;
}

export const GET = async (): Promise<NextResponse<TaskResponse | ErrorResponse>> => {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/tasks`, {
      cache: 'no-store',
    });

    const task: TaskDocument = await response.json();
    const responseData: TaskResponse = {
      message: 'タスク取得成功',
      tasks: task,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    const errorResponse: ErrorResponse = { message: 'タスク取得失敗' };
    return NextResponse.json(errorResponse, { status: 500 });
  }
};

export const dynamic = 'force-dynamic';

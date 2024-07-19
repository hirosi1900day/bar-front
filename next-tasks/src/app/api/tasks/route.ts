import { NextResponse } from 'next/server';
import { TaskDocument } from '@/models/task';

export const GET = async () => {
  try {
    const allTasks: TaskDocument[] = [
      {
        id: '1',
        title: 'task',
        description: 'task',
        dueDate: '2022-01-01',
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]

    return NextResponse.json({ message: 'タスク取得成功', tasks: allTasks });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'タスク取得失敗' }, { status: 500 });
  }
};

export const dynamic = 'force-dynamic';

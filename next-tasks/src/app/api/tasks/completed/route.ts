import { NextResponse } from 'next/server';
import { TaskDocument } from '@/models/task';

export const GET = async () => {
  try {
    const completedTasks: TaskDocument[] = [
      {
        id: '1',
        title: '',
        description: '',
        dueDate: '',
        isCompleted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]

    return NextResponse.json({ message: 'タスク取得成功', tasks: completedTasks });
  } catch (error) {
    return NextResponse.json({ message: 'タスク取得失敗' }, { status: 500 });
  }
};

export const dynamic = 'force-dynamic';

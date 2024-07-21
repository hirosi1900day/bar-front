import { TaskDocument } from '@/models/task';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const currentDate = new Date().toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '-');
  try {
    const completedTasks: TaskDocument[] = [
      {
        id: '1',
        title: 'task',
        description: 'task',
        dueDate: currentDate,
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

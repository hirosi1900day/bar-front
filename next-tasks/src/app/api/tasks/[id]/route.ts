import { NextRequest, NextResponse } from 'next/server';
import { TaskDocument } from '@/models/task';

export const GET = async (
  _: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const task = {
      id: params.id,
      title: 'task',
      description: 'task',
      dueDate: '2022-01-01',
      isCompleted: false,
    } as TaskDocument;
    if (!task) {
      return NextResponse.json(
        { message: 'タスクが存在しません' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'タスク取得成功', task });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'タスク取得失敗' }, { status: 500 });
  }
};

export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { TaskDocument } from '@/models/task';

export const GET = async (): Promise<NextResponse> => {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/tasks`, {
      cache: 'no-store',
    });

    return NextResponse.json({ message: 'タスク取得成功', tasks: await response.json() });
  } catch (error) {
    return NextResponse.json({ message: 'タスク取得失敗' }, { status: 500 });
  }
};

export const dynamic = 'force-dynamic';

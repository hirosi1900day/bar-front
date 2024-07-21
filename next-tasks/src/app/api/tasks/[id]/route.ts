import { NextRequest, NextResponse } from 'next/server';
import { TaskDocument } from '@/models/task';


type TaskResponse = {
  message: string;
  tasks: TaskDocument;
}

type ErrorResponse = {
  message: string;
}

export const GET = async (
  _: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<TaskResponse | ErrorResponse>> => {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/tasks/${params.id}`, {
      cache: 'no-store',
    });

    const task = await response.json();

    if (response.status == 404 ) {
      return NextResponse.json(
        { message: 'タスクが存在しません' },
        { status: 404 }
      );
    }

    if (response.status == 400 ) {
      return NextResponse.json(
        { message: 'クライアントエラー' },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: 'タスク取得成功', task });
  } catch (error) {
    return NextResponse.json({ message: 'タスク取得失敗' }, { status: 500 });
  }
};

export const dynamic = 'force-dynamic';

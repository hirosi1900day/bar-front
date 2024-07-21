import { NextRequest, NextResponse } from 'next/server';
import { TaskDocument } from '@/models/task';


type TaskResponse = {
  message: string;
  tasks: TaskDocument;
}

type ErrorResponse = {
  message: string;
}

const createErrorResponse = (message: string, status: number) => {
  return NextResponse.json({ message }, { status });
};

export const GET = async (
  _: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<TaskResponse | ErrorResponse>> => {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/tasks/${params.id}`, {
      cache: 'no-store',
    });

    const task = await response.json();

    if (!response.ok) {
      const errorMessages: { [key: number]: string } = {
        404: 'タスクが存在しません',
        400: 'クライアントエラー',
        500: 'サーバーエラー',
      };

      return createErrorResponse(errorMessages[response.status] || 'エラーが発生しました', response.status);
    }

    return NextResponse.json({ message: 'タスク取得成功', task });
  } catch (error) {
    return NextResponse.json({ message: 'タスク取得失敗' }, { status: 500 });
  }
};

export const dynamic = 'force-dynamic';

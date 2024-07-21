import TaskCard from '@/components/TaskCard/TaskCard';
import { TaskDocument } from '@/models/task';
import Link from 'next/link';
import { MdAddTask } from 'react-icons/md';

const getAllTasks = async (): Promise<TaskDocument[]> => {
  try {
    const response = await fetch(`${process.env.API_URL}/tasks`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch tasks: ${response.status} ${response.statusText}`);
    }

    const { tasks } = await response.json();
    
    if (!tasks || !Array.isArray(tasks)) {
      throw new Error('Invalid response format');
    }
    
    return tasks as TaskDocument[];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Failed to fetch tasks');
  }
};

export default async function MainPage() {
  const allTasks = await getAllTasks();

  return (
    <div className="text-gray-800 p-8 h-full overflow-y-auto pb-24">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">All Tasks</h1>
        <Link
          href="/new"
          className="flex items-center gap-1 font-semibold border px-4
      py-2 rounded-full shadow-sm text-white bg-gray-800 hover:bg-gray-700"
        >
          <MdAddTask className="size-5" />
          <div>Add Task</div>
        </Link>
      </header>
      <div className="mt-8 flex flex-wrap gap-4">
        {allTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

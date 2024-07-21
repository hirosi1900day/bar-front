import EditTaskForm from '@/components/EditTaskForm/EditTaskForm';
import { TaskDocument } from '@/models/task';
import NotFound from '@/app/not-found';

interface Params {
  params: { id: string };
}

const getTask = async (id: string): Promise<TaskDocument | null> => {
  try {
    const response = await fetch(`${process.env.API_URL}/tasks/${id}`, { cache: 'no-store' });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Error fetching task with id ${id}: ${response.statusText}`);
    }

    const { task: { data } } = await response.json();

    return data as TaskDocument;
  } catch (error) {
    console.error('Error in getTask:', error);
    throw error; // Re-throw the error after logging it
  }
};

const EditTaskPage = async ({ params }: Params) => {
  const id = params.id;
  const task = await getTask(id);
  if (task === null) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col justify-center py-20">
      <h2 className="text-center text-2xl font-bold">Edit Task</h2>
      <EditTaskForm task={task} />
    </div>
  );
};

export default EditTaskPage;

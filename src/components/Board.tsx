import Column from "./Column";
import type { Task, TaskPriority, TaskUpdateFields } from "../utils/helper";

export default function Board({
  tasks,
  searchQuery,
  onDeleteTask,
  onMoveTask,
  onUpdateTask,
  draggingTaskId,
  onTaskDragStart,
}: {
  tasks: Task[];
  searchQuery: string;
  onDeleteTask: (taskId: string) => void;
  onMoveTask: (taskId: string, targetPriority: TaskPriority) => void;
  onUpdateTask: (taskId: string, updatedFields: TaskUpdateFields) => void;
  draggingTaskId: string | null;
  onTaskDragStart: (taskId: string) => void;
}) {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visibleTasks = normalizedQuery
    ? tasks.filter((task) => task.title.toLowerCase().includes(normalizedQuery))
    : tasks;

  const lowTasks = visibleTasks.filter((task) => task.priority === "low");
  const mediumTasks = visibleTasks.filter((task) => task.priority === "medium");
  const highTasks = visibleTasks.filter((task) => task.priority === "high");

  return (
    <div className="min-w-0 h-full">
      <div className="grid min-w-0 h-full grid-cols-3 gap-4">
        <Column
          title="Low"
          priority="low"
          tasks={lowTasks}
          draggingTaskId={draggingTaskId}
          onDropTask={onMoveTask}
          onDeleteTask={onDeleteTask}
          onUpdateTask={onUpdateTask}
          onTaskDragStart={onTaskDragStart}
        />
        <Column
          title="Medium"
          priority="medium"
          tasks={mediumTasks}
          draggingTaskId={draggingTaskId}
          onDropTask={onMoveTask}
          onDeleteTask={onDeleteTask}
          onUpdateTask={onUpdateTask}
          onTaskDragStart={onTaskDragStart}
        />
        <Column
          title="High"
          priority="high"
          tasks={highTasks}
          draggingTaskId={draggingTaskId}
          onDropTask={onMoveTask}
          onDeleteTask={onDeleteTask}
          onUpdateTask={onUpdateTask}
          onTaskDragStart={onTaskDragStart}
        />
      </div>
    </div>
  );
}
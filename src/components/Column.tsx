import { useState, type DragEvent } from "react";
import TaskCard from "./TaskCard";
import type { Task, TaskPriority, TaskUpdateFields } from "../utils/helper";

export default function Column({
  title,
  priority,
  tasks,
  draggingTaskId,
  onDropTask,
  onDeleteTask,
  onUpdateTask,
  onTaskDragStart,
}: {
  title: string;
  priority: TaskPriority;
  tasks: Task[];
  draggingTaskId: string | null;
  onDropTask: (taskId: string, targetPriority: TaskPriority) => void;
  onDeleteTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, updatedFields: TaskUpdateFields) => void;
  onTaskDragStart: (taskId: string) => void;
}) {
  const [isDragOver, setIsDragOver] = useState(false);

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsDragOver(true);
  }

  function handleDragLeave() {
    setIsDragOver(false);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const droppedTaskId = e.dataTransfer.getData("text/task-id");

    if (droppedTaskId) {
      onDropTask(droppedTaskId, priority);
    }

    setIsDragOver(false);
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex h-full min-w-0 flex-col overflow-hidden rounded-xl border p-4 shadow-sm transition-colors ${
        isDragOver
          ? "border-blue-300 bg-blue-50"
          : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
          {tasks.length}
        </span>
      </div>

      <div className="mt-3 flex min-w-0 flex-1 flex-col gap-2 overflow-y-auto pr-1">
        {tasks.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-400">
            {draggingTaskId ? "Drop task here" : "No tasks"}
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={() => onDeleteTask(task.id)}
              onUpdate={(updatedFields) => onUpdateTask(task.id, updatedFields)}
              onDragStart={onTaskDragStart}
            />
          ))
        )}
      </div>
    </div>
  );
}
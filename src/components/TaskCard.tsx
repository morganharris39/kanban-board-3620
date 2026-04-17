import { useState, type ChangeEvent } from "react";
import TaskModal from "./TaskModal";
import type { Task, TaskPriority, TaskUpdateFields } from "../utils/helper";

const priorityStyles: Record<TaskPriority, string> = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-rose-100 text-rose-700",
};

export default function TaskCard({
  task,
  columnId,
  leftColumnId,
  rightColumnId,
  onDelete,
  onMove,
  onUpdate,
}: {
  task: Task;
  columnId: string;
  leftColumnId: string | null;
  rightColumnId: string | null;
  onDelete: () => void;
  onMove: (taskId: string, fromColumnId: string, toColumnId: string) => void;
  onUpdate: (updatedFields: TaskUpdateFields) => void;
}) {
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  function handleToggleCompleted() {
    onUpdate({ completed: !task.completed });
  }

  function handlePriorityChange(e: ChangeEvent<HTMLSelectElement>) {
    onUpdate({ priority: e.target.value as TaskPriority });
  }

  function handleDueDateChange(e: ChangeEvent<HTMLInputElement>) {
    onUpdate({ dueDate: e.target.value });
  }

  function handleSaveNotes(description: string) {
    onUpdate({ description });
    setIsNotesOpen(false);
  }

  return (
    <>
      <article className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleCompleted}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-400"
            aria-label={`Mark ${task.title} as ${task.completed ? "incomplete" : "complete"}`}
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3
                className={`text-sm font-semibold ${
                  task.completed ? "text-gray-400 line-through" : "text-gray-800"
                }`}
              >
                {task.title}
              </h3>
              <button
                onClick={onDelete}
                className="text-xs font-medium text-gray-300 hover:text-rose-500"
              >
                Delete
              </button>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className={`rounded-full px-2 py-0.5 font-medium ${priorityStyles[task.priority]}`}>
                {task.priority}
              </span>
              <span className="text-gray-400">
                {task.dueDate ? `Due ${task.dueDate}` : "No due date"}
              </span>
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <label className="flex items-center gap-2 text-xs text-gray-500">
                Priority
                <select
                  value={task.priority}
                  onChange={handlePriorityChange}
                  className="flex-1 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </label>

              <label className="flex items-center gap-2 text-xs text-gray-500">
                Due
                <input
                  type="date"
                  value={task.dueDate}
                  onChange={handleDueDateChange}
                  className="flex-1 rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </label>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              {task.description ? task.description : "No notes added yet."}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => leftColumnId && onMove(task.id, columnId, leftColumnId)}
                disabled={!leftColumnId}
                className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Move left
              </button>
              <button
                onClick={() => rightColumnId && onMove(task.id, columnId, rightColumnId)}
                disabled={!rightColumnId}
                className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Move right
              </button>
              <button
                onClick={() => setIsNotesOpen(true)}
                className="rounded-full border border-blue-200 px-3 py-1 text-xs text-blue-600 hover:bg-blue-50"
              >
                {task.description ? "View notes" : "Add notes"}
              </button>
            </div>
          </div>
        </div>
      </article>

      {isNotesOpen ? (
        <TaskModal
          task={task}
          onSave={handleSaveNotes}
          onClose={() => setIsNotesOpen(false)}
        />
      ) : null}
    </>
  );
}
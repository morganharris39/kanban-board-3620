import { useState, type ChangeEvent, type DragEvent } from "react";
import TaskModal from "./TaskModal";
import type { Task, TaskPriority, TaskUpdateFields } from "../utils/helper";

const priorityStyles: Record<TaskPriority, string> = {
  low: "bg-sky-500/20 text-sky-200",
  medium: "bg-violet-500/20 text-violet-200",
  high: "bg-fuchsia-500/20 text-fuchsia-200",
};

export default function TaskCard({
  task,
  onDelete,
  onUpdate,
  onDragStart,
}: {
  task: Task;
  onDelete: () => void;
  onUpdate: (updatedFields: TaskUpdateFields) => void;
  onDragStart: (taskId: string) => void;
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

  function handleDragStart(e: DragEvent<HTMLElement>) {
    e.dataTransfer.setData("text/task-id", task.id);
    e.dataTransfer.effectAllowed = "move";
    onDragStart(task.id);
  }

  return (
    <>
      <article
        draggable
        onDragStart={handleDragStart}
        className="w-full shrink-0 cursor-grab overflow-hidden rounded-lg bg-slate-800/95 p-3 active:cursor-grabbing"
      >
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleCompleted}
            className="mt-1 h-4 w-4 rounded bg-slate-900 text-sky-500 focus:ring-sky-400"
            aria-label={`Mark ${task.title} as ${task.completed ? "incomplete" : "complete"}`}
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3
                className={`min-w-0 wrap-break-word text-sm font-semibold ${
                  task.completed ? "text-slate-500 line-through" : "text-slate-100"
                }`}
              >
                {task.title}
              </h3>
              <button
                onClick={onDelete}
                className="text-xs font-medium text-slate-500 hover:text-fuchsia-300"
              >
                Delete
              </button>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className={`rounded-full px-2 py-0.5 font-medium ${priorityStyles[task.priority]}`}>
                {task.priority}
              </span>
              <span className="text-slate-400">
                {task.dueDate ? `Due ${task.dueDate}` : "No due date"}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2">
              <label className="flex min-w-0 flex-col gap-1 text-xs text-slate-400">
                Priority
                <select
                  value={task.priority}
                  onChange={handlePriorityChange}
                  className="w-full min-w-0 rounded-md bg-slate-700/90 px-2 py-1 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </label>

              <label className="flex min-w-0 flex-col gap-1 text-xs text-slate-400">
                Due
                <input
                  type="date"
                  value={task.dueDate}
                  onChange={handleDueDateChange}
                  className="w-full min-w-0 rounded-md bg-slate-700/90 px-2 py-1 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
                />
              </label>
            </div>

            <p className="mt-3 wrap-break-word text-xs text-slate-400">
              {task.description ? task.description : "No notes added yet."}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => setIsNotesOpen(true)}
                className="rounded-full bg-sky-400/20 px-3 py-1 text-xs text-sky-200 hover:bg-sky-400/30"
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
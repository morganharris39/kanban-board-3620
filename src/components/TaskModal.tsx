import { useState, type KeyboardEvent, type MouseEvent } from "react";
import type { Task } from "../utils/helper";

export default function TaskModal({
  task,
  onSave,
  onClose,
}: {
  task: Task;
  onSave: (description: string) => void;
  onClose: () => void;
}) {
  const [description, setDescription] = useState(task.description);

  function handleSave() {
    onSave(description);
  }

  function handleBackdropClick(e: MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 px-3 py-6 backdrop-blur-sm"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="flex max-h-[calc(100vh-3rem)] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-slate-900">
        <div className="flex items-start justify-between p-5">
          <div>
            <p className="mb-1 text-xs text-slate-400">Notes for</p>
            <h2 className="text-base font-semibold leading-tight text-slate-100">
              {task.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="ml-4 mt-0.5 text-xl leading-none text-slate-500 hover:text-fuchsia-300"
            title="Close"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto p-5">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoFocus
            rows={6}
            placeholder="Write notes about this task..."
            className="w-full resize-none rounded-xl bg-slate-700/90 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
          />
          <p className="mt-1 text-right text-xs text-slate-400">
            {description.length} characters
          </p>
        </div>
        <div className="flex gap-2 px-5 pb-5">
          <button
            onClick={handleSave}
            className="flex-1 rounded-xl bg-violet-600 py-2 text-sm font-semibold text-white transition hover:bg-violet-500"
          >
            Save notes
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-xl bg-slate-800 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-700"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
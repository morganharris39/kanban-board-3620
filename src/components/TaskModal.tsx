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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-3 py-6"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="flex max-h-[calc(100vh-3rem)] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-start justify-between p-5 border-b border-gray-100">
          <div>
            <p className="text-xs text-gray-400 mb-1">Notes for</p>
            <h2 className="font-semibold text-gray-800 text-base leading-tight">
              {task.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-gray-500 text-xl leading-none ml-4 mt-0.5"
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
            className="w-full text-sm text-gray-700 border border-gray-200 rounded-xl px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <p className="text-xs text-gray-300 text-right mt-1">
            {description.length} characters
          </p>
        </div>
        <div className="flex gap-2 px-5 pb-5">
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl py-2 transition-colors"
          >
            Save notes
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium rounded-xl py-2 transition-colors"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
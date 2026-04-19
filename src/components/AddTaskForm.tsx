// ============================================================
// AddTaskForm.jsx
// A small form that lives at the bottom of each Column.
// It lets the user type a task title and submit it.
// This handles feature 1: "A user can create a new task card"
// ============================================================

import { useState, type KeyboardEvent } from "react";

export default function AddTaskForm({
  onAddTask,
}: {
  onAddTask: (title: string) => void;
}) {
  const [title, setTitle] = useState("");

  function handleSubmit() {
    const cleanedTitle = title.trim();
    if (cleanedTitle === "") {
      return;
    }

    onAddTask(cleanedTitle);
    setTitle("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSubmit();
    }

    if (e.key === "Escape") {
      setTitle("");
    }
  }

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <label className="text-sm font-medium text-gray-700">Add task</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Task title"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="min-w-0 flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Add to Low
        </button>
        <button
          onClick={() => {
            setTitle("");
          }}
          className="min-w-0 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100"
        >
          Clear
        </button>
      </div>
      <p className="text-xs text-gray-500">New tasks start in the Low column.</p>
    </div>
  );
}
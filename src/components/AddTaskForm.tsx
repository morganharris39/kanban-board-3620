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
      <label className="text-sm font-medium tracking-wide text-slate-200">Add task</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Task title"
        className="w-full rounded-lg bg-slate-700/90 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
      />
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="min-w-0 flex-1 rounded-lg bg-violet-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-violet-500"
        >
          Add to Low
        </button>
        <button
          onClick={() => {
            setTitle("");
          }}
          className="min-w-0 rounded-lg bg-slate-900/70 px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-800"
        >
          Clear
        </button>
      </div>
      <p className="text-xs text-slate-400">New tasks start in the Low column.</p>
    </div>
  );
}
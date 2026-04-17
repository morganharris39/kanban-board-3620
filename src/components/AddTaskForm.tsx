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
  // The current value of the text input
  const [title, setTitle] = useState("");

  // Whether the form is expanded (showing the input)
  // or collapsed (just showing a "+ Add task" button).
  // Starting collapsed keeps the UI clean.
  const [isOpen, setIsOpen] = useState(false);

  // ==========================================================
  // FUNCTION: handleSubmit
  // Validates the input, calls onAddTask, then resets the form.
  // We trim() to avoid saving tasks that are just blank spaces.
  // ==========================================================
  function handleSubmit() {
    const trimmed = title.trim();
    if (trimmed === "") return; // do nothing if input is empty
    onAddTask(trimmed);         // tell App.jsx to create the task
    setTitle("");               // clear the input for the next task
    setIsOpen(false);           // collapse the form again
  }

  // ==========================================================
  // FUNCTION: handleKeyDown
  // Enter submits, Escape collapses and clears the form.
  // ==========================================================
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") {
      setTitle("");
      setIsOpen(false);
    }
  }

  // ==========================================================
  // RENDER
  // ==========================================================
  if (!isOpen) {
    // COLLAPSED STATE — just a subtle button
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full text-sm text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg py-2 transition-colors text-left px-2"
      >
        + Add task
      </button>
    );
  }

  // EXPANDED STATE — show the input and action buttons
  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        placeholder="Task title..."
        className="w-full text-sm border border-blue-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <div className="flex gap-2">
        {/* SUBMIT BUTTON */}
        <button
          onClick={handleSubmit}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg py-1.5 transition-colors"
        >
          Add
        </button>
        {/* CANCEL BUTTON */}
        <button
          onClick={() => {
            setTitle("");
            setIsOpen(false);
          }}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm rounded-lg py-1.5 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
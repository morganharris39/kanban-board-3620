// ============================================================
// AddColumnForm.jsx
// Sits at the end of the columns row in Board.jsx.
// Lets the user create a new column with a custom name.
// This handles feature 10: "A user can create a new column"
// ============================================================

import { useState, type KeyboardEvent } from "react";

export default function AddColumnForm({
  onAddColumn,
}: {
  onAddColumn: (name: string) => void;
}) {
  // The current value of the column name input
  const [name, setName] = useState("");

  // Whether the form is expanded or collapsed.
  // Same collapsed/expanded pattern as AddTaskForm.
  const [isOpen, setIsOpen] = useState(false);

  // ==========================================================
  // FUNCTION: handleSubmit
  // Validates, calls onAddColumn, then resets.
  // ==========================================================
  function handleSubmit() {
    const trimmed = name.trim();
    if (trimmed === "") return;
    onAddColumn(trimmed);  // tell App.jsx to create the column
    setName("");
    setIsOpen(false);
  }

  // ==========================================================
  // FUNCTION: handleKeyDown
  // Enter submits, Escape cancels.
  // ==========================================================
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") {
      setName("");
      setIsOpen(false);
    }
  }

  // ==========================================================
  // RENDER
  // ==========================================================
  if (!isOpen) {
    // COLLAPSED — a card-shaped button that matches the column width
    return (
      <div className="min-w-70 w-70">
        <button
          onClick={() => setIsOpen(true)}
          className="h-16 w-full rounded-xl border-2 border-dashed border-gray-300 text-sm text-gray-400 transition-colors hover:border-blue-400 hover:text-blue-400"
        >
          + Add column
        </button>
      </div>
    );
  }

  // EXPANDED — input and action buttons, same width as a column
  return (
    <div className="flex w-70 min-w-70 flex-col gap-3 rounded-xl bg-gray-50 p-4 shadow">
      <p className="text-sm font-semibold text-gray-600">New column</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        placeholder="Column name..."
        className="w-full text-sm border border-blue-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="min-w-0 flex-1 rounded-lg bg-blue-500 py-1.5 text-sm text-white transition-colors hover:bg-blue-600"
        >
          Add
        </button>
        <button
          onClick={() => {
            setName("");
            setIsOpen(false);
          }}
          className="min-w-0 flex-1 rounded-lg bg-gray-100 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
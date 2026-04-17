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
      <div className="min-w-[280px] w-[280px]">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full h-16 rounded-xl border-2 border-dashed border-gray-300 text-gray-400 hover:border-blue-400 hover:text-blue-400 text-sm transition-colors"
        >
          + Add column
        </button>
      </div>
    );
  }

  // EXPANDED — input and action buttons, same width as a column
  return (
    <div className="min-w-[280px] w-[280px] bg-gray-50 rounded-xl shadow p-4 flex flex-col gap-3">
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
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg py-1.5 transition-colors"
        >
          Add
        </button>
        <button
          onClick={() => {
            setName("");
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
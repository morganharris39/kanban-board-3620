// ============================================================
// Column.jsx
// Represents a single column on the board.
// Responsibilities:
//   - Display the column name (with inline rename on click)
//   - Show a live task count in the header
//   - Render each TaskCard inside it
//   - Render the AddTaskForm at the bottom
//   - Provide a delete button for the column
// ============================================================

import { useState } from "react";
// import TaskCard from "./TaskCard";
// import AddTaskForm from "./AddTaskForm";

export default function Column({
  column,               // the single column object: { id, name, tasks }
  allColumns,           // the full array of columns (needed for move buttons)
  getAdjacentColumnId,  // helper from Board.jsx to find left/right column ids
  onAddTask,
  onDeleteTask,
  onMoveTask,
  onUpdateTask,
  onDeleteColumn,
  onRenameColumn,
}) {

  // ==========================================================
  // STATE: isEditing
  // Controls whether the column title is showing as plain text
  // or as an editable input field.
  // Starts as false (just showing text).
  // ==========================================================
  const [isEditing, setIsEditing] = useState(false);

  // ==========================================================
  // STATE: editedName
  // Holds the value of the input field while the user is typing
  // a new column name. We initialize it to the current column name
  // so the input starts pre-filled with the existing name.
  // ==========================================================
  const [editedName, setEditedName] = useState(column.name);

  // ==========================================================
  // FUNCTION: handleRenameSubmit
  // Called when the user finishes editing the column name
  // (by pressing Enter or clicking away / onBlur).
  //
  // We trim() the name to remove accidental leading/trailing spaces.
  // If the user cleared the input entirely, we don't save — we just
  // revert back to the original name instead.
  // ==========================================================
  function handleRenameSubmit() {
    const trimmed = editedName.trim();
    if (trimmed === "") {
      // Don't allow an empty column name — revert
      setEditedName(column.name);
    } else {
      onRenameColumn(column.id, trimmed);
    }
    setIsEditing(false);
  }

  // ==========================================================
  // FUNCTION: handleRenameKeyDown
  // Lets the user press Enter to confirm, or Escape to cancel.
  // ==========================================================
  function handleRenameKeyDown(e) {
    if (e.key === "Enter") {
      handleRenameSubmit();
    }
    if (e.key === "Escape") {
      setEditedName(column.name); // revert to original
      setIsEditing(false);
    }
  }

  // ==========================================================
  // FUNCTION: handleDeleteColumn
  // Asks for confirmation before deleting so the user doesn't
  // accidentally wipe out a whole column of tasks.
  // window.confirm() is a simple browser dialog — returns true
  // if the user clicks OK, false if they click Cancel.
  // ==========================================================
  function handleDeleteColumn() {
    const confirmed = window.confirm(
      `Delete the "${column.name}" column and all its tasks?`
    );
    if (confirmed) {
      onDeleteColumn(column.id);
    }
  }

  // ==========================================================
  // RENDER
  // ==========================================================
  return (
    <div className="bg-gray-50 rounded-xl shadow p-4 min-w-[280px] w-[280px] flex flex-col gap-3">

      {/* ---- COLUMN HEADER ---- */}
      <div className="flex items-center justify-between gap-2">

        {isEditing ? (
          // ---- EDIT MODE: show an input field ----
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onBlur={handleRenameSubmit}      // save when clicking away
            onKeyDown={handleRenameKeyDown}  // save on Enter, cancel on Escape
            autoFocus                        // focus the input as soon as it appears
            className="flex-1 px-2 py-1 text-sm font-semibold border border-blue-400 rounded focus:outline-none"
          />
        ) : (
          // ---- VIEW MODE: show the title + task count ----
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <h2
              className="font-semibold text-gray-700 truncate cursor-pointer hover:text-blue-500"
              onClick={() => setIsEditing(true)} // clicking the title enters edit mode
              title="Click to rename"
            >
              {column.name}
            </h2>

            {/* TASK COUNT BADGE — updates live as tasks are added/removed */}
            <span className="bg-gray-200 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
              {column.tasks.length}
            </span>
          </div>
        )}

        {/* DELETE COLUMN BUTTON */}
        <button
          onClick={handleDeleteColumn}
          className="text-gray-300 hover:text-red-400 text-lg leading-none flex-shrink-0"
          title="Delete column"
        >
          ✕
        </button>
      </div>

      {/* ---- TASK LIST ---- */}
      {/*
        This maps over the tasks in this column and renders a TaskCard for each.
        We also figure out whether the left/right move buttons should be
        disabled (if there's no column in that direction).
      */}
      <div className="flex flex-col gap-2">
        {column.tasks.length === 0 ? (
          <p className="text-gray-300 text-sm text-center py-4">No tasks yet</p>
        ) : (
          column.tasks.map((task) => (
            // Temporarily render a plain card until TaskCard.jsx is built.
            // Replace with <TaskCard ... /> once it exists.
            <div
              key={task.id}
              className="bg-white rounded-lg shadow-sm p-3 text-sm text-gray-700"
            >
              {task.title}
            </div>

            // ---- UNCOMMENT once TaskCard.jsx is built ----
            // <TaskCard
            //   key={task.id}
            //   task={task}
            //   columnId={column.id}
            //   leftColumnId={getAdjacentColumnId(column.id, "left")}
            //   rightColumnId={getAdjacentColumnId(column.id, "right")}
            //   onDelete={() => onDeleteTask(column.id, task.id)}
            //   onMove={onMoveTask}
            //   onUpdate={(updatedFields) => onUpdateTask(column.id, task.id, updatedFields)}
            // />
          ))
        )}
      </div>

      {/* ---- ADD TASK FORM ---- */}
      {/* Sits at the bottom of each column */}
      {/* Uncomment once AddTaskForm.jsx is built: */}
      {/* <AddTaskForm onAddTask={(title) => onAddTask(column.id, title)} /> */}

      {/* Temporary placeholder */}
      <p className="text-gray-300 text-xs text-center">+ AddTaskForm goes here</p>

    </div>
  );
}
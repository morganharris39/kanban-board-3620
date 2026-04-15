import { useState, useEffect } from "react";
import Board from "./components/Board";

// ============================================================
// INITIAL DATA
// This is what the board looks like when the app first loads
// (if there's nothing saved in localStorage yet).
// Each column has a unique id, a name, and an array of tasks.
// Each task also has a unique id plus fields for all our features.
// ============================================================
const initialBoard = [
  {
    id: "col-1",
    name: "To Do",
    tasks: [
      {
        id: "task-1",
        title: "Example task",
        description: "",
        priority: "medium",
        dueDate: "",
        completed: false,
      },
    ],
  },
  {
    id: "col-2",
    name: "In Progress",
    tasks: [],
  },
  {
    id: "col-3",
    name: "Done",
    tasks: [],
  },
];

// ============================================================
// HELPER: generateId
// Creates a unique ID string for any new task or column.
// crypto.randomUUID() is built into modern browsers — no library needed.
// ============================================================
function generateId() {
  return crypto.randomUUID();
}

// ============================================================
// APP COMPONENT
// This is the root of your entire application.
// All board data (state) lives here, and all functions that
// change that data are defined here and passed down as props.
// ============================================================
export default function App() {

  // ==========================================================
  // STATE: columns
  // "columns" is your entire board — an array of column objects.
  // "setColumns" is the function you call to update that array.
  //
  // useState() sets the starting value. Here we try to load
  // from localStorage first. If nothing is saved yet, we fall
  // back to initialBoard above.
  // ==========================================================
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem("kanban-board");
    return saved ? JSON.parse(saved) : initialBoard;
  });

  // ==========================================================
  // STATE: searchQuery
  // Tracks whatever the user has typed into the search bar.
  // Starts as an empty string (no search active).
  // ==========================================================
  const [searchQuery, setSearchQuery] = useState("");

  // ==========================================================
  // EFFECT: save to localStorage
  // useEffect runs a side-effect whenever its dependencies change.
  // Here: every time "columns" changes, we save it to localStorage.
  // This is what makes the board persist across page refreshes.
  // ==========================================================
  useEffect(() => {
    localStorage.setItem("kanban-board", JSON.stringify(columns));
  }, [columns]); // <-- only re-runs when "columns" changes

  // ==========================================================
  // FUNCTION: addColumn
  // Creates a brand new column and adds it to the end of the board.
  // Called from AddColumnForm when the user submits a column name.
  // ==========================================================
  function addColumn(name) {
    const newColumn = {
      id: generateId(),
      name: name,
      tasks: [],
    };
    // We never mutate state directly in React.
    // Instead we create a NEW array with the old columns + the new one.
    setColumns([...columns, newColumn]);
  }

  // ==========================================================
  // FUNCTION: deleteColumn
  // Removes a column (and all its tasks) from the board.
  // .filter() returns a new array with every column EXCEPT the one
  // whose id matches the one we want to delete.
  // ==========================================================
  function deleteColumn(columnId) {
    setColumns(columns.filter((col) => col.id !== columnId));
  }

  // ==========================================================
  // FUNCTION: renameColumn
  // Updates just the name of one specific column.
  // .map() loops over every column and returns a new array.
  // If the column's id matches, we return a new version of it
  // with the updated name. Otherwise we return it unchanged.
  // ==========================================================
  function renameColumn(columnId, newName) {
    setColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, name: newName } : col
      )
    );
  }

  // ==========================================================
  // FUNCTION: addTask
  // Creates a new task object and adds it to the correct column.
  // ==========================================================
  function addTask(columnId, taskTitle) {
    const newTask = {
      id: generateId(),
      title: taskTitle,
      description: "",
      priority: "medium",  // default priority
      dueDate: "",
      completed: false,
    };
    setColumns(
      columns.map((col) =>
        // Find the right column, then add the new task to its tasks array
        col.id === columnId
          ? { ...col, tasks: [...col.tasks, newTask] }
          : col
      )
    );
  }

  // ==========================================================
  // FUNCTION: deleteTask
  // Removes one specific task from one specific column.
  // ==========================================================
  function deleteTask(columnId, taskId) {
    setColumns(
      columns.map((col) =>
        col.id === columnId
          ? { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) }
          : col
      )
    );
  }

  // ==========================================================
  // FUNCTION: moveTask
  // Moves a task from one column to another.
  // Steps:
  //   1. Find the task object in the source column
  //   2. Remove it from the source column
  //   3. Add it to the destination column
  // ==========================================================
  function moveTask(taskId, fromColumnId, toColumnId) {
    // Find the task we want to move
    const sourceColumn = columns.find((col) => col.id === fromColumnId);
    const taskToMove = sourceColumn.tasks.find((t) => t.id === taskId);

    setColumns(
      columns.map((col) => {
        if (col.id === fromColumnId) {
          // Remove the task from the source column
          return { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) };
        }
        if (col.id === toColumnId) {
          // Add the task to the destination column
          return { ...col, tasks: [...col.tasks, taskToMove] };
        }
        // All other columns stay the same
        return col;
      })
    );
  }

  // ==========================================================
  // FUNCTION: updateTask
  // A general-purpose updater for any task field.
  // Instead of separate functions for title, priority, etc.,
  // we pass in an object with just the fields we want to change.
  //
  // Example call:
  //   updateTask("col-1", "task-1", { priority: "high" })
  //   updateTask("col-1", "task-1", { completed: true })
  //   updateTask("col-1", "task-1", { title: "New title", dueDate: "2025-12-01" })
  //
  // The spread operator { ...task, ...updatedFields } means:
  // "take all existing task fields, then overwrite with the new ones"
  // ==========================================================
  function updateTask(columnId, taskId, updatedFields) {
    setColumns(
      columns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, ...updatedFields }
                  : task
              ),
            }
          : col
      )
    );
  }

  // ==========================================================
  // RENDER
  // This is what gets displayed on screen.
  // We import and use Board, AddColumnForm, and a search input here.
  // Props (the stuff in the JSX tags) is how we pass data and
  // functions DOWN to child components.
  // ==========================================================
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* ---- APP HEADER ---- */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">My Kanban Board</h1>

        {/* SEARCH BAR — controls the searchQuery state */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      
      <Board
        columns={columns}
        searchQuery={searchQuery}
        onAddTask={addTask}
        onDeleteTask={deleteTask}
        onMoveTask={moveTask}
        onUpdateTask={updateTask}
        onDeleteColumn={deleteColumn}
        onRenameColumn={renameColumn}
      />
     

      {/* ---- ADD COLUMN FORM ---- */}
      {/*
        Same idea — uncomment once AddColumnForm.jsx exists:
      */}
      {/*
      <AddColumnForm onAddColumn={addColumn} />
      */}

      {/* TEMPORARY: just so you can see the app is working */}
      <p className="text-gray-500 text-sm">
        Board loaded with {columns.length} columns. Start building Board.jsx!
      </p>
    </div>
  );
}
import { useState } from "react";
import Board from "./components/Board";
import useLocalStorage from "./hooks/useLocalStorage";
import { generateId, type ColumnData } from "./utils/helper";

// ============================================================
// INITIAL DATA
// This is what the board looks like when the app first loads
// (if there's nothing saved in localStorage yet).
// Each column has a unique id, a name, and an array of tasks.
// Each task also has a unique id plus fields for all our features.
// ============================================================
const initialBoard: ColumnData[] = [
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

export default function App() {
  const [columns, setColumns] = useLocalStorage<ColumnData[]>(
    "kanban-board",
    initialBoard
  );
  const [searchQuery, setSearchQuery] = useState("");

  function addColumn(name: string) {
    const newColumn = {
      id: generateId(),
      name: name,
      tasks: [],
    };
    setColumns((currentColumns) => [...currentColumns, newColumn]);
  }

  function deleteColumn(columnId: string) {
    setColumns((currentColumns) =>
      currentColumns.filter((col) => col.id !== columnId)
    );
  }

  function renameColumn(columnId: string, newName: string) {
    setColumns((currentColumns) =>
      currentColumns.map((col) =>
        col.id === columnId ? { ...col, name: newName } : col
      )
    );
  }

  function addTask(columnId: string, taskTitle: string) {
    const newTask = {
      id: generateId(),
      title: taskTitle,
      description: "",
      priority: "medium" as const,
      dueDate: "",
      completed: false,
    };

    setColumns((currentColumns) =>
      currentColumns.map((col) =>
        col.id === columnId
          ? { ...col, tasks: [...col.tasks, newTask] }
          : col
      )
    );
  }

  function deleteTask(columnId: string, taskId: string) {
    setColumns((currentColumns) =>
      currentColumns.map((col) =>
        col.id === columnId
          ? { ...col, tasks: col.tasks.filter((task) => task.id !== taskId) }
          : col
      )
    );
  }

  function moveTask(taskId: string, fromColumnId: string, toColumnId: string) {
    setColumns((currentColumns) => {
      if (fromColumnId === toColumnId) {
        return currentColumns;
      }

      const sourceColumn = currentColumns.find((col) => col.id === fromColumnId);
      const destinationColumn = currentColumns.find((col) => col.id === toColumnId);

      if (!sourceColumn || !destinationColumn) {
        return currentColumns;
      }

      const taskToMove = sourceColumn.tasks.find((task) => task.id === taskId);

      if (!taskToMove) {
        return currentColumns;
      }

      return currentColumns.map((col) => {
        if (col.id === fromColumnId) {
          return { ...col, tasks: col.tasks.filter((task) => task.id !== taskId) };
        }

        if (col.id === toColumnId) {
          return { ...col, tasks: [...col.tasks, taskToMove] };
        }

        return col;
      });
    });
  }

  function updateTask(
    columnId: string,
    taskId: string,
    updatedFields: Partial<ColumnData["tasks"][number]>
  ) {
    setColumns((currentColumns) =>
      currentColumns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.map((task) =>
                task.id === taskId ? { ...task, ...updatedFields } : task
              ),
            }
          : col
      )
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">My Kanban Board</h1>
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
        onAddColumn={addColumn}
      />
    </div>
  );
}
import { useState, type KeyboardEvent } from "react";
import TaskCard from "./TaskCard";
import AddTaskForm from "./AddTaskForm";
import type { ColumnData, TaskUpdateFields } from "../utils/helper";

export default function Column({
  column,
  getAdjacentColumnId,
  onAddTask,
  onDeleteTask,
  onMoveTask,
  onUpdateTask,
  onDeleteColumn,
  onRenameColumn,
}: {
  column: ColumnData;
  getAdjacentColumnId: (currentColumnId: string, direction: "left" | "right") => string | null;
  onAddTask: (columnId: string, taskTitle: string) => void;
  onDeleteTask: (columnId: string, taskId: string) => void;
  onMoveTask: (taskId: string, fromColumnId: string, toColumnId: string) => void;
  onUpdateTask: (
    columnId: string,
    taskId: string,
    updatedFields: TaskUpdateFields
  ) => void;
  onDeleteColumn: (columnId: string) => void;
  onRenameColumn: (columnId: string, newName: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(column.name);

  function handleRenameSubmit() {
    const trimmed = editedName.trim();
    if (trimmed === "") {
      setEditedName(column.name);
    } else {
      onRenameColumn(column.id, trimmed);
    }
    setIsEditing(false);
  }

  function handleRenameKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleRenameSubmit();
    }
    if (e.key === "Escape") {
      setEditedName(column.name);
      setIsEditing(false);
    }
  }

  function handleDeleteColumn() {
    const confirmed = window.confirm(
      `Delete the "${column.name}" column and all its tasks?`
    );
    if (confirmed) {
      onDeleteColumn(column.id);
    }
  }

  return (
    <div className="bg-gray-50 rounded-xl shadow p-4 min-w-[280px] w-[280px] flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">

        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onBlur={handleRenameSubmit}
            onKeyDown={handleRenameKeyDown}
            autoFocus
            className="flex-1 px-2 py-1 text-sm font-semibold border border-blue-400 rounded focus:outline-none"
          />
        ) : (
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <h2
              className="font-semibold text-gray-700 truncate cursor-pointer hover:text-blue-500"
              onClick={() => setIsEditing(true)}
              title="Click to rename"
            >
              {column.name}
            </h2>

            <span className="bg-gray-200 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
              {column.tasks.length}
            </span>
          </div>
        )}

        <button
          onClick={handleDeleteColumn}
          className="text-gray-300 hover:text-red-400 text-lg leading-none flex-shrink-0"
          title="Delete column"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {column.tasks.length === 0 ? (
          <p className="text-gray-300 text-sm text-center py-4">No tasks yet</p>
        ) : (
          column.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              columnId={column.id}
              leftColumnId={getAdjacentColumnId(column.id, "left")}
              rightColumnId={getAdjacentColumnId(column.id, "right")}
              onDelete={() => onDeleteTask(column.id, task.id)}
              onMove={onMoveTask}
              onUpdate={(updatedFields) => onUpdateTask(column.id, task.id, updatedFields)}
            />
          ))
        )}
      </div>

      <AddTaskForm onAddTask={(title: string) => onAddTask(column.id, title)} />
    </div>
  );
}
import Column from "./Column";
import AddColumnForm from "./AddColumnForm";
import type { ColumnData, TaskUpdateFields } from "../utils/helper";

export default function Board({
  columns,
  searchQuery,
  onAddTask,
  onDeleteTask,
  onMoveTask,
  onUpdateTask,
  onDeleteColumn,
  onRenameColumn,
  onAddColumn,
}: {
  columns: ColumnData[];
  searchQuery: string;
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
  onAddColumn: (name: string) => void;
}) {
  const filteredColumns = columns.map((col) => ({
    ...col,
    tasks: col.tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  function getAdjacentColumnId(currentColumnId: string, direction: "left" | "right") {
    const index = columns.findIndex((col) => col.id === currentColumnId);
    if (direction === "left" && index > 0) {
      return columns[index - 1].id;
    }
    if (direction === "right" && index < columns.length - 1) {
      return columns[index + 1].id;
    }
    return null; // no column in that direction
  }

  return (
    <div>
      <div className="flex items-start gap-4 overflow-x-auto pb-4">
        {filteredColumns.map((col) => (
          <Column
            key={col.id}
            column={col}
            getAdjacentColumnId={getAdjacentColumnId}
            onAddTask={onAddTask}
            onDeleteTask={onDeleteTask}
            onMoveTask={onMoveTask}
            onUpdateTask={onUpdateTask}
            onDeleteColumn={onDeleteColumn}
            onRenameColumn={onRenameColumn}
          />
        ))}
        <AddColumnForm onAddColumn={onAddColumn} />
      </div>
    </div>
  );
}
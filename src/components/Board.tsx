// ============================================================
// Board.jsx
// This component receives all the columns from App.jsx and
// renders them side by side. It also handles filtering tasks
// based on the search query before passing data down to Column.
// ============================================================

// We'll import Column and AddColumnForm once you build them.
// For now they're commented out so the file doesn't crash.
import Column from "./Column";
// import AddColumnForm from "./AddColumnForm";

export default function Board({
  columns,        // the full array of column objects from App.jsx
  searchQuery,    // the current search text from the search bar
  onAddTask,      // function to add a task to a column
  onDeleteTask,   // function to delete a task
  onMoveTask,     // function to move a task between columns
  onUpdateTask,   // function to update any field on a task
  onDeleteColumn, // function to delete a column
  onRenameColumn, // function to rename a column
  onAddColumn,    // function to add a new column
}) {

  // ==========================================================
  // FILTERING TASKS BY SEARCH QUERY
  //
  // We don't want to change the real "columns" data when searching.
  // Instead we create a NEW version of columns where each column's
  // task list is filtered down to only matching tasks.
  //
  // .toLowerCase() makes the search case-insensitive so that
  // typing "buy" matches a task called "Buy groceries".
  //
  // If searchQuery is empty, every task passes the filter
  // because "".includes("") is always true.
  // ==========================================================
  const filteredColumns = columns.map((col) => ({
    ...col,
    tasks: col.tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  // ==========================================================
  // CALCULATING COLUMN INDEX HELPERS
  //
  // When the user clicks the left/right arrow on a task card,
  // we need to know what the previous and next column IDs are.
  // We pass a helper function down to each Column so it can
  // figure out which direction to move.
  //
  // getAdjacentColumnId(currentColumnId, "left")  → id of column to the left
  // getAdjacentColumnId(currentColumnId, "right") → id of column to the right
  // Returns null if there is no column in that direction.
  // ==========================================================
  function getAdjacentColumnId(currentColumnId, direction) {
    const index = columns.findIndex((col) => col.id === currentColumnId);
    if (direction === "left" && index > 0) {
      return columns[index - 1].id;
    }
    if (direction === "right" && index < columns.length - 1) {
      return columns[index + 1].id;
    }
    return null; // no column in that direction
  }

  // ==========================================================
  // RENDER
  //
  // We map over filteredColumns (not the original columns) so
  // that the search filtering is reflected on screen.
  //
  // Each Column gets:
  //   - its own column data (id, name, tasks)
  //   - the full columns array (so it knows left/right neighbors)
  //   - all the handler functions it needs
  // ==========================================================
  return (
    <div>

      {/* ---- COLUMNS ROW ---- */}
      {/*
        flex: puts all columns side by side
        items-start: columns don't stretch to match the tallest one
        overflow-x-auto: if there are too many columns, scroll sideways
        gap-4: space between columns
        pb-4: padding at the bottom so the scrollbar doesn't overlap content
      */}
      <div className="flex items-start gap-4 overflow-x-auto pb-4">

        {filteredColumns.map((col) => (
          // Temporarily render a plain div until Column.jsx is built
          // Replace this whole block with <Column ... /> once it exists
          <div
            key={col.id}
            className="bg-white rounded-xl shadow p-4 min-w-[280px] w-[280px]"
          >
            <p className="font-semibold text-gray-700">{col.name}</p>
            <p className="text-sm text-gray-400">{col.tasks.length} tasks</p>
          </div>

          // ---- UNCOMMENT THIS once Column.jsx is built ----
          <Column
            key={col.id}
            column={col}
            allColumns={columns}
            getAdjacentColumnId={getAdjacentColumnId}
            onAddTask={onAddTask}
            onDeleteTask={onDeleteTask}
            onMoveTask={onMoveTask}
            onUpdateTask={onUpdateTask}
            onDeleteColumn={onDeleteColumn}
            onRenameColumn={onRenameColumn}
          />
        ))}

        {/* ---- ADD COLUMN FORM ---- */}
        {/* Sits at the end of the columns row */}
        {/* Uncomment once AddColumnForm.jsx is built: */}
        {/* <AddColumnForm onAddColumn={onAddColumn} /> */}

        {/* Temporary button placeholder */}
        <div className="min-w-[200px]">
          <p className="text-gray-400 text-sm">+ Add column form goes here</p>
        </div>

      </div>
    </div>
  );
}
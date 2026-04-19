import { useState } from "react";
import Board from "./components/Board";
import AddTaskForm from "./components/AddTaskForm";
import useLocalStorage from "./hooks/useLocalStorage";
import { generateId, type Task, type TaskPriority, type TaskUpdateFields } from "./utils/helper";

const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Example task",
    description: "",
    priority: "low",
    dueDate: "",
    completed: false,
  },
];

export default function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("kanban-board-v2", initialTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);

  function addTask(taskTitle: string) {
    const newTask: Task = {
      id: generateId(),
      title: taskTitle,
      description: "",
      priority: "low",
      dueDate: "",
      completed: false,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  }

  function deleteTask(taskId: string) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  }

  function moveTask(taskId: string, targetPriority: TaskPriority) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, priority: targetPriority } : task
      )
    );
    setDraggingTaskId(null);
  }

  function updateTask(taskId: string, updatedFields: TaskUpdateFields) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedFields } : task
      )
    );
  }

  function handleTaskDragStart(taskId: string) {
    setDraggingTaskId(taskId);
  }

  return (
    <div className="h-screen overflow-hidden bg-transparent px-4 py-5 sm:px-6">
      <div className="grid h-full gap-5 lg:grid-cols-[18rem_1fr]">
        <aside className="h-full rounded-2xl bg-slate-900/80 p-4 backdrop-blur">
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">Search tasks</label>
              <input
                type="text"
                placeholder="Search by title"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg bg-slate-700/90 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
              />
            </div>

            <div className="h-px bg-violet-400/30" />

            <AddTaskForm onAddTask={addTask} />
          </div>
        </aside>

        <section className="h-full min-w-0">
          <Board
            tasks={tasks}
            searchQuery={searchQuery}
            onDeleteTask={deleteTask}
            onMoveTask={moveTask}
            onUpdateTask={updateTask}
            draggingTaskId={draggingTaskId}
            onTaskDragStart={handleTaskDragStart}
          />
        </section>
      </div>
    </div>
  );
}

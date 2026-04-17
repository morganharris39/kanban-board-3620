export type TaskPriority = "low" | "medium" | "high";

export interface Task {
	id: string;
	title: string;
	description: string;
	priority: TaskPriority;
	dueDate: string;
	completed: boolean;
}

export interface ColumnData {
	id: string;
	name: string;
	tasks: Task[];
}

export type TaskUpdateFields = Partial<
	Pick<Task, "title" | "description" | "priority" | "dueDate" | "completed">
>;

export function generateId() {
	return crypto.randomUUID();
}

export type Priority = "critical" | "high" | "medium" | "low"
export type Status = "todo" | "in-progress" | "in-review" | "done"
export type ViewType = "kanban" | "list" | "timeline"

export interface User {
  id: string
  name: string
  color: string
}

export interface Task {
  id: string
  title: string
  status: Status
  priority: Priority
  assigneeId: string
  startDate: string | null
  dueDate: string
  createdAt: string
}

export interface Filters {
  statuses: Status[]
  priorities: Priority[]
  assigneeIds: string[]
  dueDateFrom: string
  dueDateTo: string
}

export interface CollabUser {
  id: string
  name: string
  color: string
  activeTaskId: string | null
}
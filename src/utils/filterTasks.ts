import type { Task, Filters } from "../types"

export function filterTasks(tasks: Task[], filters: Filters): Task[] {
  return tasks.filter((task) => {
    if (filters.statuses.length > 0 && !filters.statuses.includes(task.status)) return false
    if (filters.priorities.length > 0 && !filters.priorities.includes(task.priority)) return false
    if (filters.assigneeIds.length > 0 && !filters.assigneeIds.includes(task.assigneeId)) return false
    if (filters.dueDateFrom && task.dueDate < filters.dueDateFrom) return false
    if (filters.dueDateTo && task.dueDate > filters.dueDateTo) return false
    return true
  })
}

export function hasActiveFilters(filters: Filters): boolean {
  return (
    filters.statuses.length > 0 ||
    filters.priorities.length > 0 ||
    filters.assigneeIds.length > 0 ||
    filters.dueDateFrom !== "" ||
    filters.dueDateTo !== ""
  )
}
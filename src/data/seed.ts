import type { Task, User, Priority, Status } from "../types"

export const USERS: User[] = [
  { id: "u1", name: "Alice Johnson", color: "#6366f1" },
  { id: "u2", name: "Bob Smith",     color: "#f59e0b" },
  { id: "u3", name: "Carol White",   color: "#10b981" },
  { id: "u4", name: "David Lee",     color: "#ef4444" },
  { id: "u5", name: "Eva Chen",      color: "#8b5cf6" },
  { id: "u6", name: "Frank Davis",   color: "#06b6d4" },
]

const priorities: Priority[] = ["critical", "high", "medium", "low"]
const statuses: Status[] = ["todo", "in-progress", "in-review", "done"]

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function toISO(date: Date): string {
  return date.toISOString().split("T")[0]
}

const verbs = ["Fix", "Build", "Update", "Review", "Design", "Test", "Deploy", "Refactor", "Document", "Migrate"]
const nouns = [
  "login page", "dashboard", "API", "database", "UI components",
  "auth flow", "settings page", "notifications", "search feature",
  "payment module", "user profile", "onboarding flow",
]

function makeTitle(): string {
  return `${pick(verbs)} ${pick(nouns)}`
}

export function generateTasks(count = 500): Task[] {
  const today = new Date()
  const tasks: Task[] = []

  for (let i = 0; i < count; i++) {
    const dueDayOffset = Math.floor(Math.random() * 60) - 20
    const dueDate = addDays(today, dueDayOffset)

    // about 15% of tasks have no start date — tests the Gantt edge case
    const hasStart = Math.random() > 0.15
    const startDate = hasStart
      ? addDays(dueDate, -(Math.floor(Math.random() * 14) + 1))
      : null

    tasks.push({
      id:         `task-${i + 1}`,
      title:      makeTitle(),
      status:     pick(statuses),
      priority:   pick(priorities),
      assigneeId: pick(USERS).id,
      startDate:  startDate ? toISO(startDate) : null,
      dueDate:    toISO(dueDate),
      createdAt:  toISO(addDays(today, -Math.floor(Math.random() * 30))),
    })
  }

  return tasks
}

export const INITIAL_TASKS = generateTasks(500)
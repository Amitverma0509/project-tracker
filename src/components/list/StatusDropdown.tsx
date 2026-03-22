import { useStore }  from "../../store/useStore"
import type { Status } from "../../types"

interface Props {
  taskId:  string
  current: Status
}

const STATUS_LABELS: Record<Status, string> = {
  "todo":        "To Do",
  "in-progress": "In Progress",
  "in-review":   "In Review",
  "done":        "Done",
}

const STATUS_COLORS: Record<Status, string> = {
  "todo":        "bg-gray-100 text-gray-600",
  "in-progress": "bg-yellow-100 text-yellow-700",
  "in-review":   "bg-indigo-100 text-indigo-700",
  "done":        "bg-green-100 text-green-700",
}

export function StatusDropdown({ taskId, current }: Props) {
  const { updateTaskStatus } = useStore()

  return (
    <select
      value={current}
      onChange={(e) => updateTaskStatus(taskId, e.target.value as Status)}
      // Stop click from bubbling (prevents row selection if we add that later)
      onClick={(e) => e.stopPropagation()}
      className={`
        text-xs font-medium px-2 py-1 rounded-full border-0
        cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-300
        ${STATUS_COLORS[current]}
      `}
    >
      {Object.entries(STATUS_LABELS).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  )
}

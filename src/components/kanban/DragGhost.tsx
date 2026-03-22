import type { Task }       from "../../types"
import { PriorityBadge }  from "../shared/PriorityBadge"
import { AssigneeAvatar } from "../shared/AssigneeAvatar"
import { getDueDateLabel } from "../../utils/dateUtils"

interface Props {
  task:        Task
  x:           number
  y:           number
  width:       number
  snappingBack: boolean
}

export function DragGhost({ task, x, y, width, snappingBack }: Props) {
  const { label, isOverdue, isDueToday } = getDueDateLabel(task.dueDate)

  return (
    <div
      style={{
        position:  "fixed",
        left:       x,
        top:        y,
        width:      width,
        zIndex:     9999,
        pointerEvents: "none",  // ghost should not block pointer events
        opacity:    snappingBack ? 0 : 0.85,
        transform:  snappingBack ? "scale(0.95)" : "scale(1.03) rotate(1.5deg)",
        transition: snappingBack
          ? "opacity 0.3s ease, transform 0.3s ease"
          : "transform 0.1s ease",
      }}
    >
      <div className="bg-white rounded-xl border-2 border-indigo-400 p-4 shadow-2xl">
        <p className="text-sm font-medium text-gray-900 mb-3 leading-snug">
          {task.title}
        </p>
        <div className="mb-3">
          <PriorityBadge priority={task.priority} />
        </div>
        <div className="flex items-center justify-between">
          <AssigneeAvatar assigneeId={task.assigneeId} />
          <span className={`text-xs font-medium ${
            isOverdue ? "text-red-500" : isDueToday ? "text-orange-500" : "text-gray-400"
          }`}>
            {label}
          </span>
        </div>
      </div>
    </div>
  )
}

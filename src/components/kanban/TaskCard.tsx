import type { Task, CollabUser } from "../../types"
import { PriorityBadge }    from "../shared/PriorityBadge"
import { AssigneeAvatar }   from "../shared/AssigneeAvatar"
import { CollabAvatars }    from "../shared/CollabAvatars"
import { getDueDateLabel }  from "../../utils/dateUtils"

interface Props {
  task:          Task
  isDragging:    boolean
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void
  collabUsers:   CollabUser[]   // ← NEW: users viewing this card
}

export function TaskCard({ task, isDragging, onPointerDown, collabUsers }: Props) {
  const { label, isOverdue, isDueToday } = getDueDateLabel(task.dueDate)

  if (isDragging) {
    return (
      <div
        style={{ height: 130 }}
        className="rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50"
      />
    )
  }

  return (
    <div
      onPointerDown={onPointerDown}
      className={`
        bg-white rounded-xl border p-4 shadow-sm
        hover:shadow-md hover:-translate-y-0.5 transition-all duration-150
        cursor-grab active:cursor-grabbing select-none
        ${collabUsers.length > 0
          ? "border-indigo-300 ring-1 ring-indigo-200"   // highlight if someone is viewing
          : "border-gray-200"
        }
      `}
    >
      {/* Top row — collab avatars on the right */}
      <div className="flex items-start justify-between mb-2">
        <p className="text-sm font-medium text-gray-900 leading-snug flex-1 pr-2">
          {task.title}
        </p>
        {/* Collab users viewing this card */}
        <CollabAvatars users={collabUsers} />
      </div>

      {/* Priority badge */}
      <div className="mb-3">
        <PriorityBadge priority={task.priority} />
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between">
        <AssigneeAvatar assigneeId={task.assigneeId} />
        <span className={`text-xs font-medium ${
          isOverdue  ? "text-red-500"    :
          isDueToday ? "text-orange-500" :
                       "text-gray-400"
        }`}>
          {label}
        </span>
      </div>
    </div>
  )
}
import type { Task }        from "../../types"
import { USERS }            from "../../data/seed"
import { PriorityBadge }   from "../shared/PriorityBadge"
import { AssigneeAvatar }  from "../shared/AssigneeAvatar"
import { StatusDropdown }  from "./StatusDropdown"
import { getDueDateLabel } from "../../utils/dateUtils"

interface Props {
  task:   Task
  style:  React.CSSProperties   // used by virtual scroll for positioning
}

export function ListRow({ task, style }: Props) {
  const user                             = USERS.find((u) => u.id === task.assigneeId)
  const { label, isOverdue, isDueToday } = getDueDateLabel(task.dueDate)

  return (
    <div
      style={style}
      className="flex items-center px-4 border-b border-gray-100
                 hover:bg-gray-50 transition-colors duration-100"
    >
      {/* Title — takes up remaining space */}
      <div className="flex-1 min-w-0 pr-4">
        <p className="text-sm font-medium text-gray-900 truncate">
          {task.title}
        </p>
      </div>

      {/* Status dropdown */}
      <div className="w-36 flex-shrink-0">
        <StatusDropdown taskId={task.id} current={task.status} />
      </div>

      {/* Priority badge */}
      <div className="w-28 flex-shrink-0">
        <PriorityBadge priority={task.priority} />
      </div>

      {/* Assignee */}
      <div className="w-36 flex-shrink-0 flex items-center gap-2">
        <AssigneeAvatar assigneeId={task.assigneeId} size="sm" />
        <span className="text-xs text-gray-500 truncate">
          {user?.name ?? "Unknown"}
        </span>
      </div>

      {/* Due date */}
      <div className="w-32 flex-shrink-0 text-right">
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

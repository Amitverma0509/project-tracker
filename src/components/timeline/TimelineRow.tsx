import type { Task, Priority } from "../../types"
import { AssigneeAvatar }      from "../shared/AssigneeAvatar"
import { DAY_WIDTH }           from "./TimelineHeader"

// Bar colours per priority
const PRIORITY_COLORS: Record<Priority, string> = {
  critical: "bg-red-400    border-red-500",
  high:     "bg-orange-400 border-orange-500",
  medium:   "bg-yellow-400 border-yellow-500",
  low:      "bg-green-400  border-green-500",
}

interface Props {
  task:      Task
  days:      Date[]
  year:      number
  month:     number
  todayIdx:  number
}

export function TimelineRow({ task, days, year, month, todayIdx }: Props) {
  const totalDays = days.length

  // Figure out where the bar starts and ends in terms of day indices
  function clampIndex(isoDate: string | null): number | null {
    if (!isoDate) return null
    const d = new Date(isoDate)
    // If before this month, clamp to 0
    if (d.getFullYear() < year || (d.getFullYear() === year && d.getMonth() < month)) return 0
    // If after this month, clamp to last day
    if (d.getFullYear() > year || (d.getFullYear() === year && d.getMonth() > month)) return totalDays - 1
    return d.getDate() - 1
  }

  const dueIdx   = clampIndex(task.dueDate)
  const startIdx = task.startDate ? clampIndex(task.startDate) : null

  // If due date is completely outside this month, don't render the row bar
  const dueDateInMonth = new Date(task.dueDate)
  const outOfMonth = (
    dueDateInMonth.getFullYear() !== year ||
    dueDateInMonth.getMonth()    !== month
  ) && startIdx === null

  return (
    <div className="flex items-center border-b border-gray-100 hover:bg-gray-50 group"
         style={{ height: 44 }}>

      {/* Task label */}
      <div className="w-56 flex-shrink-0 border-r border-gray-100 px-3 flex items-center gap-2">
        <AssigneeAvatar assigneeId={task.assigneeId} size="sm" />
        <span className="text-xs text-gray-700 truncate font-medium" title={task.title}>
          {task.title}
        </span>
      </div>

      {/* The grid + bar */}
      <div className="flex relative" style={{ height: 44 }}>

        {/* Day grid cells (background) */}
        {days.map((day, idx) => {
          const isToday   = idx === todayIdx
          const isWeekend = day.getDay() === 0 || day.getDay() === 6
          return (
            <div
              key={idx}
              style={{ width: DAY_WIDTH }}
              className={`
                flex-shrink-0 h-full border-r border-gray-100
                ${isToday   ? "bg-red-50/50"  : ""}
                ${isWeekend ? "bg-gray-50/80"  : ""}
              `}
            />
          )
        })}

        {/* Today vertical line */}
        {todayIdx >= 0 && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-red-400 z-10 pointer-events-none"
            style={{ left: todayIdx * DAY_WIDTH + DAY_WIDTH / 2 }}
          />
        )}

        {/* ── Task bar OR single-day dot ── */}
        {!outOfMonth && dueIdx !== null && (
          <>
            {startIdx !== null ? (
              /* Multi-day bar */
              <div
                className={`
                  absolute top-1/2 -translate-y-1/2 rounded-md border
                  ${PRIORITY_COLORS[task.priority]}
                  opacity-80 group-hover:opacity-100 transition-opacity
                `}
                style={{
                  left:   startIdx * DAY_WIDTH + 2,
                  width:  Math.max(DAY_WIDTH - 4, (dueIdx - startIdx + 1) * DAY_WIDTH - 4),
                  height: 20,
                }}
                title={`${task.title} — ${task.startDate} to ${task.dueDate}`}
              />
            ) : (
              /* Single-day dot (no start date) */
              <div
                className={`
                  absolute top-1/2 -translate-y-1/2 rounded-full border-2
                  ${PRIORITY_COLORS[task.priority]}
                `}
                style={{
                  left:   dueIdx * DAY_WIDTH + DAY_WIDTH / 2 - 8,
                  width:  16,
                  height: 16,
                }}
                title={`${task.title} — due ${task.dueDate} (no start date)`}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

import { useMemo }           from "react"
import { useStore }          from "../../store/useStore"
import { filterTasks }       from "../../utils/filterTasks"
import { getDaysInMonth }    from "../../utils/dateUtils"
import { TimelineHeader }    from "./TimelineHeader"
import { TimelineRow }       from "./TimelineRow"
import { hasActiveFilters }  from "../../utils/filterTasks"

export function TimelineView() {
  const { tasks, filters, clearFilters } = useStore()
  const filteredTasks = filterTasks(tasks, filters)
  const isFiltering   = hasActiveFilters(filters)

  // Current month
  const today = new Date()
  const year  = today.getFullYear()
  const month = today.getMonth()

  // All days in this month
  const days = useMemo(() => getDaysInMonth(year, month), [year, month])

  // Today's index in this month (0-based)
  const todayIdx = today.getDate() - 1

  // Month label e.g. "March 2026"
  const monthLabel = today.toLocaleString("default", { month: "long", year: "numeric" })

  return (
    <div className="flex flex-col h-full">

      {/* Month title */}
      <div className="px-6 py-3 bg-white border-b border-gray-200 flex items-center justify-between flex-shrink-0">
        <h2 className="text-base font-semibold text-gray-800">
          📅 {monthLabel}
        </h2>
        <span className="text-sm text-gray-400">
          {filteredTasks.length} tasks
        </span>
      </div>

      {/* Horizontally scrollable area */}
      <div className="flex-1 overflow-auto">

        {/* Header row */}
        <TimelineHeader days={days} todayIdx={todayIdx} />

        {/* Empty state */}
        {filteredTasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-5xl mb-4">📅</div>
            <p className="text-lg font-semibold text-gray-700 mb-1">
              No tasks to show
            </p>
            <p className="text-sm text-gray-400 mb-6">
              Try adjusting your filters
            </p>
            {isFiltering && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium
                           rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Task rows */}
        {filteredTasks.map((task) => (
          <TimelineRow
            key={task.id}
            task={task}
            days={days}
            year={year}
            month={month}
            todayIdx={todayIdx}
          />
        ))}
      </div>
    </div>
  )
}
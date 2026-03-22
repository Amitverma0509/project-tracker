import { useState, useMemo } from "react"
import { useStore }          from "../../store/useStore"
import { filterTasks, hasActiveFilters } from "../../utils/filterTasks"
import { useVirtualScroll }  from "../../hooks/useVirtualScroll"
import { SortableHeader }    from "./SortableHeader"
import { ListRow }           from "./ListRow"
import type { Task }         from "../../types"

const PRIORITY_ORDER = { critical: 0, high: 1, medium: 2, low: 3 }
const ROW_HEIGHT = 56
type SortField = "title" | "priority" | "dueDate"

export function ListView() {
  const { tasks, filters, clearFilters } = useStore()
  const [sortField, setSortField] = useState<SortField>("dueDate")
  const [sortDir,   setSortDir]   = useState<"asc" | "desc">("asc")

  function handleSort(field: string) {
    const f = field as SortField
    if (f === sortField) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortField(f)
      setSortDir("asc")
    }
  }

  const sortedTasks = useMemo(() => {
    const filtered = filterTasks(tasks, filters)
    return [...filtered].sort((a: Task, b: Task) => {
      let cmp = 0
      if (sortField === "title")    cmp = a.title.localeCompare(b.title)
      if (sortField === "priority") cmp = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
      if (sortField === "dueDate")  cmp = a.dueDate.localeCompare(b.dueDate)
      return sortDir === "asc" ? cmp : -cmp
    })
  }, [tasks, filters, sortField, sortDir])

  const { containerRef, onScroll, startIndex, endIndex, totalHeight, offsetY } =
    useVirtualScroll({ totalCount: sortedTasks.length, rowHeight: ROW_HEIGHT, buffer: 5 })

  const isFiltering = hasActiveFilters(filters)

  return (
    <div className="flex flex-col h-full">
      {/* sticky header */}
      <div className="bg-white border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center px-4 py-0">
          <div className="flex-1">
            <SortableHeader label="Title"    field="title"    sortField={sortField} sortDir={sortDir} onSort={handleSort} />
          </div>
          <div className="w-36 flex-shrink-0">
            <SortableHeader label="Status"   field="status"   sortField={sortField} sortDir={sortDir} onSort={handleSort} />
          </div>
          <div className="w-28 flex-shrink-0">
            <SortableHeader label="Priority" field="priority" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
          </div>
          <div className="w-36 flex-shrink-0 px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Assignee
          </div>
          <div className="w-32 flex-shrink-0">
            <SortableHeader label="Due Date" field="dueDate"  sortField={sortField} sortDir={sortDir} onSort={handleSort} />
          </div>
        </div>
      </div>

      {sortedTasks.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg font-semibold text-gray-700 mb-1">No tasks match your filters</p>
          <p className="text-sm text-gray-400 mb-6">Try adjusting or clearing your filters</p>
          {isFiltering && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {sortedTasks.length > 0 && (
        <div ref={containerRef} onScroll={onScroll} className="flex-1 overflow-y-auto relative">
          <div style={{ height: totalHeight, position: "relative" }}>
            <div style={{ position: "absolute", top: offsetY, left: 0, right: 0 }}>
              {sortedTasks.slice(startIndex, endIndex + 1).map((task) => (
                <ListRow key={task.id} task={task} style={{ height: ROW_HEIGHT }} />
              ))}
            </div>
          </div>
        </div>
      )}

      {sortedTasks.length > 0 && (
        <div className="border-t border-gray-200 px-4 py-2 bg-white flex-shrink-0">
          <span className="text-xs text-gray-400">{sortedTasks.length} tasks</span>
        </div>
      )}
    </div>
  )
}
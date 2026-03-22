import { useStore }         from "../../store/useStore"
import { hasActiveFilters } from "../../utils/filterTasks"
import { MultiSelect }      from "./MultiSelect"
import { USERS }            from "../../data/seed"
import type { Status, Priority } from "../../types"

const STATUS_OPTIONS = [
  { value: "todo",        label: "To Do"       },
  { value: "in-progress", label: "In Progress" },
  { value: "in-review",   label: "In Review"   },
  { value: "done",        label: "Done"        },
]

const PRIORITY_OPTIONS = [
  { value: "critical", label: "🔴 Critical" },
  { value: "high",     label: "🟠 High"     },
  { value: "medium",   label: "🟡 Medium"   },
  { value: "low",      label: "🟢 Low"      },
]

const ASSIGNEE_OPTIONS = USERS.map((u) => ({ value: u.id, label: u.name }))

export function FilterBar() {
  const { filters, setFilters, clearFilters } = useStore()
  const isFiltering = hasActiveFilters(filters)

  return (
    <div className="flex flex-wrap items-center gap-3 px-6 py-3 bg-white border-b border-gray-200">
      <MultiSelect
        label="Status"
        options={STATUS_OPTIONS}
        selected={filters.statuses}
        onChange={(vals) => setFilters({ statuses: vals as Status[] })}
      />
      <MultiSelect
        label="Priority"
        options={PRIORITY_OPTIONS}
        selected={filters.priorities}
        onChange={(vals) => setFilters({ priorities: vals as Priority[] })}
      />
      <MultiSelect
        label="Assignee"
        options={ASSIGNEE_OPTIONS}
        selected={filters.assigneeIds}
        onChange={(vals) => setFilters({ assigneeIds: vals })}
      />

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Due:</span>
        <input
          type="date"
          value={filters.dueDateFrom}
          onChange={(e) => setFilters({ dueDateFrom: e.target.value })}
          className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-indigo-400"
        />
        <span className="text-gray-400 text-sm">→</span>
        <input
          type="date"
          value={filters.dueDateTo}
          onChange={(e) => setFilters({ dueDateTo: e.target.value })}
          className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-indigo-400"
        />
      </div>

      {isFiltering && (
        <button
          onClick={clearFilters}
          className="ml-auto flex items-center gap-1 text-sm text-red-500 hover:text-red-600 font-medium"
        >
          <span>✕</span> Clear filters
        </button>
      )}
    </div>
  )
}
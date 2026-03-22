interface Props {
  label:     string
  field:     string         // which field this header sorts by
  sortField: string         // currently active sort field
  sortDir:   "asc" | "desc"
  onSort:    (field: string) => void
}

export function SortableHeader({ label, field, sortField, sortDir, onSort }: Props) {
  const isActive = sortField === field

  return (
    <th
      onClick={() => onSort(field)}
      className="px-4 py-3 text-left text-xs font-semibold text-gray-500
                 uppercase tracking-wider cursor-pointer select-none
                 hover:text-gray-700 hover:bg-gray-100 transition-colors"
    >
      <div className="flex items-center gap-1">
        <span>{label}</span>

        {/* Show sort arrow only on active column */}
        <span className={`text-xs transition-opacity ${isActive ? "opacity-100" : "opacity-20"}`}>
          {isActive && sortDir === "asc" ? "↑" : "↓"}
        </span>
      </div>
    </th>
  )
}

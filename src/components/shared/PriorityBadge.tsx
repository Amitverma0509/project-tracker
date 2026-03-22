import type { Priority } from "../../types"

interface Props {
  priority: Priority
}

// Each priority gets its own colour
const CONFIG: Record<Priority, { label: string; classes: string }> = {
  critical: { label: "Critical", classes: "bg-red-100 text-red-700 border border-red-200"      },
  high:     { label: "High",     classes: "bg-orange-100 text-orange-700 border border-orange-200" },
  medium:   { label: "Medium",   classes: "bg-yellow-100 text-yellow-700 border border-yellow-200" },
  low:      { label: "Low",      classes: "bg-green-100 text-green-700 border border-green-200"   },
}

export function PriorityBadge({ priority }: Props) {
  const { label, classes } = CONFIG[priority]
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${classes}`}>
      {label}
    </span>
  )
}

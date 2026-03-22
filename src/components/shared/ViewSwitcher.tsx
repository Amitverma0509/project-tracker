import { useStore } from "../../store/useStore"
import type { ViewType } from "../../types"

const VIEWS: { id: ViewType; label: string; icon: string }[] = [
  { id: "kanban",   label: "Kanban",   icon: "⬜" },
  { id: "list",     label: "List",     icon: "☰"  },
  { id: "timeline", label: "Timeline", icon: "📅" },
]

export function ViewSwitcher() {
  const { activeView, setView } = useStore()

  return (
    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
      {VIEWS.map((v) => {
        const isActive = activeView === v.id
        return (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
              transition-all duration-150
              ${isActive
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
              }
            `}
          >
            <span>{v.icon}</span>
            <span>{v.label}</span>
          </button>
        )
      })}
    </div>
  )
}
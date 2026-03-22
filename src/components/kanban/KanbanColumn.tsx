import type { Task, Status, CollabUser } from "../../types"
import { TaskCard }                       from "./TaskCard"

interface Props {
  status:       Status
  title:        string
  tasks:        Task[]
  color:        string
  draggingId:   string | null
  isOver:       boolean
  collabUsers:  CollabUser[]   // ← NEW
  onPointerEnter:    () => void
  onPointerLeave:    () => void
  onCardPointerDown: (e: React.PointerEvent<HTMLDivElement>, taskId: string) => void
}

export function KanbanColumn({
  status, title, tasks, color,
  draggingId, isOver, collabUsers,
  onPointerEnter, onPointerLeave, onCardPointerDown,
}: Props) {
  return (
    <div
      className={`
        flex flex-col rounded-2xl min-w-[300px] w-[300px] max-h-full
        transition-colors duration-150
        ${isOver ? "bg-indigo-50 ring-2 ring-indigo-300" : "bg-gray-50"}
      `}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <div className="flex items-center justify-between px-4 py-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
          <h2 className="text-sm font-semibold text-gray-700">{title}</h2>
        </div>
        <span className="bg-gray-200 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>

      <div className="h-px bg-gray-200 mx-4 mb-3" />

      <div className="flex-1 overflow-y-auto px-3 pb-3 flex flex-col gap-3 hide-scrollbar">
        {tasks.length === 0 && !isOver && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-3xl mb-2">📭</div>
            <p className="text-sm text-gray-400 font-medium">No tasks here</p>
            <p className="text-xs text-gray-300 mt-1">Drag a card here to move it</p>
          </div>
        )}

        {tasks.length === 0 && isOver && (
          <div className="h-20 rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50/50" />
        )}

        {tasks.map((task) => {
          // Which collab users are on THIS card?
          const onThisCard = collabUsers.filter((u) => u.activeTaskId === task.id)
          return (
            <TaskCard
              key={task.id}
              task={task}
              isDragging={task.id === draggingId}
              collabUsers={onThisCard}
              onPointerDown={(e) => onCardPointerDown(e, task.id)}
            />
          )
        })}
      </div>
    </div>
  )
}
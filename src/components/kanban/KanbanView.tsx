import { useStore }       from "../../store/useStore"
import { filterTasks }    from "../../utils/filterTasks"
import { KanbanColumn }   from "./KanbanColumn"
import { DragGhost }      from "./DragGhost"
import { useDragAndDrop } from "../../hooks/useDragAndDrop"
import type { Status }    from "../../types"

const COLUMNS: { status: Status; title: string; color: string }[] = [
  { status: "todo",        title: "To Do",       color: "#94a3b8" },
  { status: "in-progress", title: "In Progress", color: "#f59e0b" },
  { status: "in-review",   title: "In Review",   color: "#6366f1" },
  { status: "done",        title: "Done",        color: "#10b981" },
]

export function KanbanView() {
  const { tasks, filters, collabUsers } = useStore()   // ← add collabUsers
  const filteredTasks = filterTasks(tasks, filters)

  const {
    dragging, overColumn, snappingBack,
    onCardPointerDown, onPointerMove, onPointerUp,
    onColumnPointerEnter, onColumnPointerLeave,
  } = useDragAndDrop()

  const draggingTask = dragging
    ? tasks.find((t) => t.id === dragging.taskId) ?? null
    : null

  return (
    <div
      className="h-full overflow-x-auto hide-scrollbar"
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div className="flex gap-4 p-6 h-full min-w-max">
        {COLUMNS.map((col) => {
          const columnTasks = filteredTasks.filter((t) => t.status === col.status)
          return (
            <KanbanColumn
              key={col.status}
              status={col.status}
              title={col.title}
              tasks={columnTasks}
              color={col.color}
              draggingId={dragging?.taskId ?? null}
              isOver={overColumn === col.status}
              collabUsers={collabUsers}
              onPointerEnter={() => onColumnPointerEnter(col.status)}
              onPointerLeave={onColumnPointerLeave}
              onCardPointerDown={(e, taskId) => onCardPointerDown(e, taskId, col.status)}
            />
          )
        })}
      </div>

      {dragging && draggingTask && (
        <DragGhost
          task={draggingTask}
          x={dragging.x}
          y={dragging.y}
          width={dragging.width}
          snappingBack={snappingBack}
        />
      )}
    </div>
  )
}
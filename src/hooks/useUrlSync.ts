import { useEffect } from "react"
import { useStore } from "../store/useStore"
import type { Filters, ViewType } from "../types"

export function useUrlSync() {
  const { filters, activeView, setFilters, setView } = useStore()

  // on first load, read the URL and push values into the store
  useEffect(() => {
    const p = new URLSearchParams(window.location.search)

    const statuses    = p.get("statuses")?.split(",").filter(Boolean) ?? []
    const priorities  = p.get("priorities")?.split(",").filter(Boolean) ?? []
    const assigneeIds = p.get("assignees")?.split(",").filter(Boolean) ?? []
    const dueDateFrom = p.get("from") ?? ""
    const dueDateTo   = p.get("to") ?? ""
    const view        = p.get("view") as ViewType | null

    if (statuses.length || priorities.length || assigneeIds.length || dueDateFrom || dueDateTo) {
      setFilters({
        statuses:    statuses    as Filters["statuses"],
        priorities:  priorities  as Filters["priorities"],
        assigneeIds,
        dueDateFrom,
        dueDateTo,
      })
    }

    if (view && ["kanban", "list", "timeline"].includes(view)) {
      setView(view)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // whenever filters or view change, update the URL
  useEffect(() => {
    const p = new URLSearchParams()

    if (filters.statuses.length)    p.set("statuses",   filters.statuses.join(","))
    if (filters.priorities.length)  p.set("priorities", filters.priorities.join(","))
    if (filters.assigneeIds.length) p.set("assignees",  filters.assigneeIds.join(","))
    if (filters.dueDateFrom)        p.set("from",        filters.dueDateFrom)
    if (filters.dueDateTo)          p.set("to",          filters.dueDateTo)
    p.set("view", activeView)

    window.history.replaceState(null, "", `${window.location.pathname}?${p.toString()}`)
  }, [filters, activeView])
}
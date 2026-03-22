import { useState, useRef, useCallback } from "react"
import { useStore } from "../store/useStore"
import type { Status } from "../types"

interface DragState {
  taskId: string
  sourceStatus: Status
  x: number
  y: number
  width: number
  height: number
}

export function useDragAndDrop() {
  const { moveTask } = useStore()
  const [dragging, setDragging]         = useState<DragState | null>(null)
  const [overColumn, setOverColumn]     = useState<Status | null>(null)
  const [snappingBack, setSnappingBack] = useState(false)
  const draggingRef = useRef<DragState | null>(null)

  const onCardPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>, taskId: string, sourceStatus: Status) => {
      // ignore right clicks
      if (e.button !== 0) return
      e.preventDefault()
      e.currentTarget.setPointerCapture(e.pointerId)

      const rect = e.currentTarget.getBoundingClientRect()
      const state: DragState = {
        taskId,
        sourceStatus,
        x:      e.clientX - rect.width / 2,
        y:      e.clientY - rect.height / 2,
        width:  rect.width,
        height: rect.height,
      }

      draggingRef.current = state
      setDragging(state)
      setSnappingBack(false)
    },
    []
  )

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    const next = {
      ...draggingRef.current,
      x: e.clientX - draggingRef.current.width / 2,
      y: e.clientY - draggingRef.current.height / 2,
    }
    draggingRef.current = next
    setDragging(next)
  }, [])

  const onPointerUp = useCallback(() => {
    const d = draggingRef.current
    if (!d) return

    setOverColumn((col) => {
      if (col && col !== d.sourceStatus) {
        moveTask(d.taskId, col)
        draggingRef.current = null
        setDragging(null)
        return null
      }

      if (!col) {
        // dropped outside — snap back
        setSnappingBack(true)
        setTimeout(() => {
          setSnappingBack(false)
          setDragging(null)
          draggingRef.current = null
        }, 300)
        return null
      }

      // dropped on same column — just cancel
      draggingRef.current = null
      setDragging(null)
      return null
    })
  }, [moveTask])

  const onColumnPointerEnter = useCallback((status: Status) => {
    if (draggingRef.current) setOverColumn(status)
  }, [])

  const onColumnPointerLeave = useCallback(() => {
    setOverColumn(null)
  }, [])

  return {
    dragging,
    overColumn,
    snappingBack,
    onCardPointerDown,
    onPointerMove,
    onPointerUp,
    onColumnPointerEnter,
    onColumnPointerLeave,
  }
}
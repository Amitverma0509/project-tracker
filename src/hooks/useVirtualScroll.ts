import { useState, useRef, useCallback, useEffect } from "react"

interface Options {
  totalCount: number
  rowHeight: number
  buffer?: number
}

export function useVirtualScroll({ totalCount, rowHeight, buffer = 5 }: Options) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [containerHeight, setContainerHeight] = useState(600)

  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver((entries) => {
      setContainerHeight(entries[0].contentRect.height)
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }, [])

  const visibleCount = Math.ceil(containerHeight / rowHeight)
  const firstVisible = Math.floor(scrollTop / rowHeight)
  const startIndex   = Math.max(0, firstVisible - buffer)
  const endIndex     = Math.min(totalCount - 1, firstVisible + visibleCount + buffer)
  const totalHeight  = totalCount * rowHeight
  const offsetY      = startIndex * rowHeight

  return { containerRef, onScroll, startIndex, endIndex, totalHeight, offsetY }
}
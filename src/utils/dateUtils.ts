export function todayISO(): string {
  return new Date().toISOString().split("T")[0]
}

export function daysDiff(from: string, to: string): number {
  const a = new Date(from).getTime()
  const b = new Date(to).getTime()
  return Math.round((b - a) / (1000 * 60 * 60 * 24))
}

export function getDueDateLabel(dueDate: string) {
  const today = todayISO()
  const diff = daysDiff(today, dueDate)

  if (diff === 0) return { label: "Due Today", isOverdue: false, isDueToday: true }

  if (diff < 0) {
    const days = Math.abs(diff)
    return {
      label: days > 7 ? `${days}d overdue` : dueDate,
      isOverdue: true,
      isDueToday: false,
    }
  }

  return { label: dueDate, isOverdue: false, isDueToday: false }
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function getDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = []
  const d = new Date(year, month, 1)
  while (d.getMonth() === month) {
    days.push(new Date(d))
    d.setDate(d.getDate() + 1)
  }
  return days
}

export function getDayIndex(isoDate: string, year: number, month: number): number {
  const d = new Date(isoDate)
  if (d.getFullYear() !== year || d.getMonth() !== month) return -1
  return d.getDate() - 1
}
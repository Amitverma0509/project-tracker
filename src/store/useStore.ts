import { create } from "zustand"
import type { Task, Filters, ViewType, CollabUser } from "../types"
import { INITIAL_TASKS } from "../data/seed"

const defaultFilters: Filters = {
  statuses: [],
  priorities: [],
  assigneeIds: [],
  dueDateFrom: "",
  dueDateTo: "",
}

interface StoreState {
  tasks: Task[]
  filters: Filters
  activeView: ViewType
  collabUsers: CollabUser[]

  setView: (view: ViewType) => void
  setFilters: (patch: Partial<Filters>) => void
  clearFilters: () => void
  updateTaskStatus: (taskId: string, status: Status) => void
  moveTask: (taskId: string, status: Status) => void
  setCollabUsers: (users: CollabUser[]) => void
}

// small helper so we don't have to import Status separately
type Status = Task["status"]

export const useStore = create<StoreState>((set) => ({
  tasks: INITIAL_TASKS,
  filters: defaultFilters,
  activeView: "kanban",
  collabUsers: [],

  setView: (view) => set({ activeView: view }),

  setFilters: (patch) =>
    set((s) => ({ filters: { ...s.filters, ...patch } })),

  clearFilters: () => set({ filters: defaultFilters }),

  updateTaskStatus: (taskId, status) =>
    set((s) => ({
      tasks: s.tasks.map((t) => (t.id === taskId ? { ...t, status } : t)),
    })),

  moveTask: (taskId, status) =>
    set((s) => ({
      tasks: s.tasks.map((t) => (t.id === taskId ? { ...t, status } : t)),
    })),

  setCollabUsers: (users) => set({ collabUsers: users }),
}))
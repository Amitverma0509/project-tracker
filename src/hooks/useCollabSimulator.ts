import { useEffect } from "react"
import { useStore } from "../store/useStore"
import type { CollabUser } from "../types"
import { INITIAL_TASKS } from "../data/seed"

const FAKE_USERS: Omit<CollabUser, "activeTaskId">[] = [
  { id: "collab-1", name: "Sarah K", color: "#ec4899" },
  { id: "collab-2", name: "Tom W",   color: "#14b8a6" },
  { id: "collab-3", name: "Priya M", color: "#f97316" },
  { id: "collab-4", name: "Jake R",  color: "#8b5cf6" },
]

function randomTaskId(): string {
  return INITIAL_TASKS[Math.floor(Math.random() * 50)].id
}

export function useCollabSimulator() {
  const { setCollabUsers } = useStore()

  useEffect(() => {
    let users: CollabUser[] = FAKE_USERS.map((u) => ({
      ...u,
      activeTaskId: randomTaskId(),
    }))

    setCollabUsers(users)

    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * users.length)
      users = users.map((u, i) =>
        i === idx ? { ...u, activeTaskId: randomTaskId() } : u
      )
      setCollabUsers([...users])
    }, 3000)

    return () => clearInterval(interval)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
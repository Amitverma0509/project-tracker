import { USERS }       from "../../data/seed"
import { getInitials } from "../../utils/dateUtils"

interface Props {
  assigneeId: string
  size?: "sm" | "md"
}

export function AssigneeAvatar({ assigneeId, size = "sm" }: Props) {
  const user = USERS.find((u) => u.id === assigneeId)
  if (!user) return null

  const initials  = getInitials(user.name)
  const dimension = size === "sm" ? "w-7 h-7 text-xs" : "w-9 h-9 text-sm"

  return (
    <div
      title={user.name}
      className={`${dimension} rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0`}
      style={{ backgroundColor: user.color }}
    >
      {initials}
    </div>
  )
}

import type { CollabUser } from "../../types"
import { getInitials }     from "../../utils/dateUtils"

interface Props {
  users: CollabUser[]
}

export function CollabAvatars({ users }: Props) {
  if (users.length === 0) return null

  const visible  = users.slice(0, 2)
  const overflow = users.length - 2

  return (
    <div className="flex items-center">
      {visible.map((user, idx) => (
        <div
          key={user.id}
          title={`${user.name} is viewing`}
          className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-[9px]"
          style={{
            backgroundColor: user.color,
            marginLeft: idx > 0 ? -6 : 0,
            zIndex: 2 - idx,
          }}
        >
          {getInitials(user.name)}
        </div>
      ))}
      {overflow > 0 && (
        <div
          className="w-5 h-5 rounded-full border-2 border-white bg-gray-400 flex items-center justify-center text-white font-bold text-[9px]"
          style={{ marginLeft: -6 }}
        >
          +{overflow}
        </div>
      )}
    </div>
  )
}
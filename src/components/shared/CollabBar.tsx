import { useStore }    from "../../store/useStore"
import { getInitials } from "../../utils/dateUtils"

export function CollabBar() {
  const { collabUsers } = useStore()

  const activeUsers = collabUsers.filter((u) => u.activeTaskId !== null)
  const count       = activeUsers.length

  if (count === 0) return null

  return (
    <div className="flex items-center gap-2">
      {/* Stacked avatars */}
      <div className="flex items-center">
        {activeUsers.map((user, idx) => (
          <div
            key={user.id}
            title={user.name}
            className="w-7 h-7 rounded-full border-2 border-white flex items-center
                       justify-center text-white text-xs font-semibold
                       transition-all duration-500"
            style={{
              backgroundColor: user.color,
              marginLeft:      idx > 0 ? -8 : 0,
              zIndex:          activeUsers.length - idx,
            }}
          >
            {getInitials(user.name)}
          </div>
        ))}
      </div>

      {/* Count label */}
      <span className="text-xs text-gray-500 whitespace-nowrap">
        <span className="font-semibold text-gray-700">{count}</span>
        {" "}online
      </span>

      {/* Live green dot */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
      </span>
    </div>
  )
}

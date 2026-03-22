const DAY_WIDTH = 40   // px per day column — export so rows use same value
export { DAY_WIDTH }

interface Props {
  days:      Date[]
  todayIdx:  number   // which day index is today (-1 if not this month)
}

export function TimelineHeader({ days, todayIdx }: Props) {
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  return (
    <div className="flex border-b border-gray-200 bg-white sticky top-0 z-10">
      {/* Left label column */}
      <div className="w-56 flex-shrink-0 border-r border-gray-200 px-4 py-2">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Task
        </span>
      </div>

      {/* Day columns */}
      <div className="flex">
        {days.map((day, idx) => {
          const isToday   = idx === todayIdx
          const isWeekend = day.getDay() === 0 || day.getDay() === 6
          const dayName   = dayNames[day.getDay()]

          return (
            <div
              key={idx}
              style={{ width: DAY_WIDTH }}
              className={`
                flex-shrink-0 flex flex-col items-center justify-center
                py-2 border-r border-gray-100 text-xs
                ${isToday   ? "bg-red-50"   : ""}
                ${isWeekend ? "bg-gray-50"  : ""}
              `}
            >
              {/* Day name */}
              <span className={`font-medium ${isToday ? "text-red-500" : "text-gray-400"}`}>
                {dayName}
              </span>
              {/* Day number */}
              <span className={`
                font-bold mt-0.5
                ${isToday ? "text-red-500" : isWeekend ? "text-gray-400" : "text-gray-600"}
              `}>
                {day.getDate()}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

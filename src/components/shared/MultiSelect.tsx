import { useState, useRef, useEffect } from "react"

interface Option {
  value: string
  label: string
}

interface Props {
  label:     string           // e.g. "Status"
  options:   Option[]         // all available choices
  selected:  string[]         // currently selected values
  onChange:  (values: string[]) => void
}

export function MultiSelect({ label, options, selected, onChange }: Props) {
  const [open, setOpen]   = useState(false)
  const containerRef      = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function toggleOption(value: string) {
    if (selected.includes(value)) {
      // Remove it
      onChange(selected.filter((v) => v !== value))
    } else {
      // Add it
      onChange([...selected, value])
    }
  }

  const hasSelection = selected.length > 0

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg border text-sm
          transition-colors duration-150
          ${hasSelection
            ? "border-indigo-400 bg-indigo-50 text-indigo-700"
            : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
          }
        `}
      >
        <span>{label}</span>
        {/* Show count badge if something is selected */}
        {hasSelection && (
          <span className="bg-indigo-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {selected.length}
          </span>
        )}
        {/* Chevron */}
        <span className={`text-xs transition-transform ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[160px]">
          {options.map((opt) => {
            const isChecked = selected.includes(opt.value)
            return (
              <label
                key={opt.value}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleOption(opt.value)}
                  className="rounded border-gray-300 text-indigo-600"
                />
                <span className="text-gray-700">{opt.label}</span>
              </label>
            )
          })}
        </div>
      )}
    </div>
  )
}

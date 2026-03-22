import { ViewSwitcher } from "./ViewSwitcher"
import { CollabBar }    from "./CollabBar"

export function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">PT</span>
          </div>
          <h1 className="text-lg font-semibold text-gray-900">Project Tracker</h1>
        </div>

        <ViewSwitcher />

        {/* Live collab presence bar */}
        <CollabBar />
      </div>
    </header>
  )
}
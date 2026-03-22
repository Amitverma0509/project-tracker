import { useUrlSync }         from "./hooks/useUrlSync"
import { useCollabSimulator } from "./hooks/useCollabSimulator"
import { useStore }           from "./store/useStore"
import { Navbar }             from "./components/shared/Navbar"
import { FilterBar }          from "./components/shared/FilterBar"
import { KanbanView }         from "./components/kanban/KanbanView"
import { ListView }           from "./components/list/ListView"
import { TimelineView }       from "./components/timeline/TimelineView"

function App() {
  useUrlSync()
  useCollabSimulator()

  const { activeView } = useStore()

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Navbar />
      <FilterBar />
      <main className="flex-1 overflow-hidden">
        {activeView === "kanban"   && <KanbanView />}
        {activeView === "list"     && <ListView />}
        {activeView === "timeline" && <TimelineView />}
      </main>
    </div>
  )
}

export default App
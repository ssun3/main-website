interface DockWindow {
  id: string
  title: string
  isRunning: boolean
}

interface DockProps {
  minimizedWindows: DockWindow[]
  onRestore: (id: string) => void
}

export function Dock({ minimizedWindows, onRestore }: DockProps) {
  if (minimizedWindows.length === 0) return null

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-gray-900 border border-cyan-300 p-2 rounded-sm">
      {minimizedWindows.map((window) => (
        <button
          type="button"
          key={window.id}
          onClick={() => onRestore(window.id)}
          className="group relative px-2 py-1 text-xs text-cyan-300 border border-cyan-300 hover:bg-cyan-300/10"
        >
          <div className="flex items-center space-x-2">
            {window.isRunning && (
              <div className="relative w-1 h-1">
                <div className="absolute w-1 h-1 bg-cyan-300 rounded-full animate-ping" />
                <div className="absolute w-1 h-1 bg-cyan-300 rounded-full" />
              </div>
            )}
            <span>[{window.title}]</span>
          </div>
        </button>
      ))}
    </div>
  )
}

import { Volume2 } from "lucide-react"

export function StatusBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-cyan-300 px-4 py-1 text-xs flex items-center justify-between border-t border-cyan-300">
      <div className="flex items-center space-x-4">
        <span>Connection: OK</span>
        <span>User: anonymous</span>
        <span>Mainnet</span>
        <span>Tetsuo AI Pass ▮▮▮▮▮▮▮▮▮▮</span>
      </div>
      <div className="flex items-center space-x-2">
        <Volume2 className="w-4 h-4" />
        <span>8:26 PM</span>
      </div>
    </div>
  )
}

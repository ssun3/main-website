import Link from "next/link"
import { Globe } from "lucide-react"

interface NavBarProps {
  onAboutClick: () => void
}

export function NavBar({ onAboutClick }: NavBarProps) {
  return (
    <nav className="bg-cyan-200 px-4 py-2 flex items-center space-x-6 text-cyan-900">
      <Globe className="w-6 h-6" />
      <Link href="#" className="hover:text-cyan-700">
        Status
      </Link>
      <Link href="#" className="hover:text-cyan-700">
        Tetsuo AI
      </Link>
      <button type="button" onClick={onAboutClick} className="hover:text-cyan-700">
        About
      </button>
      <Link href="#" className="hover:text-cyan-700">
        Knowledge Input
      </Link>
    </nav>
  )
}

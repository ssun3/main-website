"use client"

import { useState, useEffect } from "react"
import { DraggableWindow } from "./draggable-window"

interface WindowState {
  id: string
  isOpen: boolean
  isRunning: boolean
}

interface AboutWindowProps {
  onClose: () => void
  openWindows: WindowState[]
}

export function AboutWindow({ onClose, openWindows }: AboutWindowProps) {
  const [windowSize, setWindowSize] = useState({ width: 600, height: 400 })
  const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth - 32,
        height: window.innerHeight - 140,
      })
      setWindowPosition({
        x: window.innerWidth / 2 - 300,
        y: window.innerHeight / 2 - 200,
      })
    }

    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  return (
    <DraggableWindow
      title="about"
      onClose={onClose}
      initialPosition={windowPosition}
      initialSize={windowSize}
      openWindows={openWindows}
      windowId="about"
      isNavWindow
      forceFullscreen
    >
      <div className="space-y-4 text-cyan-300">
        <h2 className="text-xl font-bold">Welcome to the Wired</h2>
        <p>Protocol 7 established.</p>
        <p>Layer 13 connection verified.</p>
        <p className="text-sm opacity-70">
          Present day, present time...
          <span className="animate-pulse">■</span>
        </p>
      </div>
    </DraggableWindow>
  )
}


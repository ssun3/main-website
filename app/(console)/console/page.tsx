"use client"

import { useState, useEffect } from "react"
import { NavBar } from "../components/nav-bar"
import { DraggableWindow } from "../components/draggable-window"
import { Chat } from "../components/chat"
import { StatusBar } from "../components/status-bar"
import { AboutWindow } from "../components/about-window"
import { WindowProvider } from "../contexts/window-context"
import { Dock } from "../components/dock"
import Image from "next/image"

interface WindowState {
  id: string
  isOpen: boolean
  isRunning: boolean
}

interface DockWindow {
  id: string
  title: string
  isRunning: boolean
}

export default function Home() {
  const [minimizedWindows, setMinimizedWindows] = useState<DockWindow[]>([])
  const [openWindows, setOpenWindows] = useState<WindowState[]>([
    { id: "chat", isOpen: true, isRunning: true },
    { id: "video", isOpen: true, isRunning: true },
    { id: "console", isOpen: true, isRunning: true },
    { id: "about", isOpen: false, isRunning: false },
  ])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleMinimize = (id: string, title: string) => {
    setMinimizedWindows((prev) => [...prev, { id, title, isRunning: true }])
    setOpenWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w)))
  }

  const handleClose = (id: string, title: string, isNavWindow: boolean) => {
    if (isNavWindow) {
      setOpenWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isOpen: false, isRunning: false } : w)))
    } else {
      setMinimizedWindows((prev) => [...prev, { id, title, isRunning: false }])
      setOpenWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isOpen: false, isRunning: false } : w)))
    }
  }

  const handleRestore = (id: string) => {
    const window = minimizedWindows.find((w) => w.id === id)
    if (!window) return

    setMinimizedWindows((prev) => prev.filter((w) => w.id !== id))
    setOpenWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isOpen: true, isRunning: window.isRunning } : w)))
  }

  const handleAboutClick = () => {
    setOpenWindows((prev) => prev.map((w) => (w.id === "about" ? { ...w, isOpen: true, isRunning: true } : w)))
  }

  if (!isClient) {
    return null // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <NavBar onAboutClick={handleAboutClick} />

      <WindowProvider>
        <main className="container mx-auto p-4 h-[calc(100vh-6rem)] relative">
          <DraggableWindow
            title="chat"
            initialPosition={{ x: 20, y: 20 }}
            initialSize={{ width: 500, height: 500 }}
            onMinimize={handleMinimize}
            onClose={() => handleClose("chat", "chat", false)}
            openWindows={openWindows}
            windowId="chat"
          >
            <Chat />
          </DraggableWindow>

          <DraggableWindow
            title="video"
            initialPosition={{ x: 540, y: 20 }}
            initialSize={{ width: 400, height: 300 }}
            onMinimize={handleMinimize}
            onClose={() => handleClose("video", "video", false)}
            openWindows={openWindows}
            windowId="video"
          >
            <div className="relative h-full">
              <Image
                src="/images/video_placeholder.png"
                alt="Video Placeholder"
                fill
                className="object-contain"
              />
            </div>
          </DraggableWindow>

          <DraggableWindow
            title="Console"
            initialPosition={{ x: 540, y: 340 }}
            initialSize={{ width: 400, height: 184 }}
            onMinimize={handleMinimize}
            onClose={() => handleClose("console", "Console", false)}
            openWindows={openWindows}
            windowId="console"
          >
            <div className="text-cyan-300 text-sm">
              Profile ...
              <br />
              Connection to ... 211.35.76.59:1
            </div>
          </DraggableWindow>

          <AboutWindow onClose={() => handleClose("about", "about", true)} openWindows={openWindows} />

          <Dock minimizedWindows={minimizedWindows} onRestore={handleRestore} />
        </main>
      </WindowProvider>

      <StatusBar />
    </div>
  )
}

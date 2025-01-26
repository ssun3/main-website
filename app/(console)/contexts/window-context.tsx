"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface WindowContextType {
  activeWindow: string | null
  setActiveWindow: (id: string | null) => void
  draggingWindow: string | null
  setDraggingWindow: (id: string | null) => void
  bringToFront: (id: string) => void
  getZIndex: (id: string, isNavWindow?: boolean) => number
}

const WindowContext = createContext<WindowContextType | null>(null)

export function useWindow() {
  const context = useContext(WindowContext)
  if (!context) {
    throw new Error("useWindow must be used within a WindowProvider")
  }
  return context
}

export function WindowProvider({ children }: { children: ReactNode }) {
  const [activeWindow, setActiveWindow] = useState<string | null>(null)
  const [draggingWindow, setDraggingWindow] = useState<string | null>(null)
  const [windowOrder, setWindowOrder] = useState<string[]>([])

  const bringToFront = useCallback((id: string) => {
    setActiveWindow(id)
    setWindowOrder((prev) => {
      const newOrder = prev.filter((windowId) => windowId !== id)
      return [...newOrder, id]
    })
  }, [])

  const getZIndex = useCallback((id: string, isNavWindow = false) => {
    if (isNavWindow) return 50
    const index = windowOrder.indexOf(id)
    return index === -1 ? 10 : index + 10
  }, [windowOrder])

  return (
    <WindowContext.Provider 
      value={{ 
        activeWindow, 
        setActiveWindow,
        draggingWindow,
        setDraggingWindow,
        bringToFront,
        getZIndex
      }}
    >
      {children}
    </WindowContext.Provider>
  )
}

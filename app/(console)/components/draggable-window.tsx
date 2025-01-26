"use client"

import { type ReactNode, useEffect, useState, useCallback } from "react"
import { Window } from "./window"
import { useDraggableResizable } from "../hooks/use-draggable-resizable"
import { useWindow } from "../contexts/window-context"

interface WindowState {
  id: string
  isOpen: boolean
  isRunning: boolean
}

interface DraggableWindowProps {
  title: string
  children: ReactNode
  className?: string
  initialPosition: { x: number; y: number }
  initialSize: { width: number; height: number }
  onMinimize?: (id: string, title: string) => void
  onClose?: () => void
  openWindows: WindowState[]
  windowId: string
  isNavWindow?: boolean
  forceFullscreen?: boolean
}

export function DraggableWindow({
  title,
  children,
  className = "",
  initialPosition,
  initialSize,
  onMinimize,
  onClose,
  openWindows,
  windowId,
  isNavWindow = false,
  forceFullscreen = false,
}: DraggableWindowProps) {
  const [isMaximized, setIsMaximized] = useState(forceFullscreen)
  const [previousState, setPreviousState] = useState({
    position: initialPosition,
    size: initialSize,
  })

  const { position, size, isDragging, isResizing, handleMouseDown, handleResizeMouseDown, setPosition, setSize } =
    useDraggableResizable(initialPosition, initialSize)
  const [isHovered, setIsHovered] = useState(false)
  const { bringToFront, getZIndex, setDraggingWindow } = useWindow()

  useEffect(() => {
    bringToFront(windowId)
  }, [windowId, bringToFront])

  useEffect(() => {
    setDraggingWindow(isDragging ? windowId : null)
  }, [isDragging, windowId, setDraggingWindow])

  useEffect(() => {
    if (forceFullscreen) {
      setPosition({ x: 0, y: 0 })
      setSize({
        width: window.innerWidth - 32,
        height: window.innerHeight - 140,
      })
    }
  }, [forceFullscreen, setPosition, setSize])

  const handleMaximize = () => {
    if (!isMaximized) {
      setPreviousState({ position, size })
      setPosition({ x: 0, y: 0 })
      setSize({
        width: window.innerWidth - 32,
        height: window.innerHeight - 140,
      })
    } else {
      setPosition(previousState.position)
      setSize(previousState.size)
    }
    setIsMaximized(!isMaximized)
  }

  const handleMinimize = () => {
    if (!isNavWindow && onMinimize) {
      onMinimize(windowId, title)
    }
  }

  const handleWindowClick = () => {
    bringToFront(windowId)
  }

  const handleResizeStart = useCallback(
    (e: React.MouseEvent, direction: string) => {
      if (!isNavWindow) {
        bringToFront(windowId)
      }
      handleResizeMouseDown(e, direction)
    },
    [handleResizeMouseDown, bringToFront, windowId, isNavWindow],
  )

  const windowState = openWindows.find((w) => w.id === windowId)
  if (!windowState?.isOpen) {
    return null
  }

  return (
    <div
      onClick={handleWindowClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleWindowClick();
        }
      }}
      className={`absolute ${isDragging ? "cursor-grabbing" : ""}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: getZIndex(windowId, isNavWindow),
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isMaximized && !forceFullscreen && (
        <>
          <div
            className="absolute -right-1 -bottom-1 w-4 h-4 cursor-se-resize z-20"
            onMouseDown={(e) => handleResizeStart(e, "se")}
            style={{
              backgroundColor: isHovered ? "rgba(0, 255, 255, 0.2)" : "transparent",
              transition: "background-color 0.3s",
            }}
          />
          <div
            className="absolute -left-1 -bottom-1 w-4 h-4 cursor-sw-resize z-20"
            onMouseDown={(e) => handleResizeStart(e, "sw")}
            style={{
              backgroundColor: isHovered ? "rgba(0, 255, 255, 0.2)" : "transparent",
              transition: "background-color 0.3s",
            }}
          />
          <div
            className="absolute -right-1 -top-1 w-4 h-4 cursor-ne-resize z-20"
            onMouseDown={(e) => handleResizeStart(e, "ne")}
            style={{
              backgroundColor: isHovered ? "rgba(0, 255, 255, 0.2)" : "transparent",
              transition: "background-color 0.3s",
            }}
          />
          <div
            className="absolute -left-1 -top-1 w-4 h-4 cursor-nw-resize z-20"
            onMouseDown={(e) => handleResizeStart(e, "nw")}
            style={{
              backgroundColor: isHovered ? "rgba(0, 255, 255, 0.2)" : "transparent",
              transition: "background-color 0.3s",
            }}
          />
          <div
            className="absolute -left-1 top-0 bottom-0 w-2 cursor-w-resize z-20"
            onMouseDown={(e) => handleResizeStart(e, "w")}
            style={{
              backgroundColor: isHovered ? "rgba(0, 255, 255, 0.2)" : "transparent",
              transition: "background-color 0.3s",
            }}
          />
          <div
            className="absolute -right-1 top-0 bottom-0 w-2 cursor-e-resize z-20"
            onMouseDown={(e) => handleResizeStart(e, "e")}
            style={{
              backgroundColor: isHovered ? "rgba(0, 255, 255, 0.2)" : "transparent",
              transition: "background-color 0.3s",
            }}
          />
          <div
            className="absolute -top-1 left-0 right-0 h-2 cursor-n-resize z-20"
            onMouseDown={(e) => handleResizeStart(e, "n")}
            style={{
              backgroundColor: isHovered ? "rgba(0, 255, 255, 0.2)" : "transparent",
              transition: "background-color 0.3s",
            }}
          />
          <div
            className="absolute -bottom-1 left-0 right-0 h-2 cursor-s-resize z-20"
            onMouseDown={(e) => handleResizeStart(e, "s")}
            style={{
              backgroundColor: isHovered ? "rgba(0, 255, 255, 0.2)" : "transparent",
              transition: "background-color 0.3s",
            }}
          />
        </>
      )}

      <Window
        title={title}
        className={`${className} w-full h-full`}
        onMaximize={handleMaximize}
        onMinimize={handleMinimize}
        onClose={onClose}
        isMaximized={isMaximized}
        onMouseDown={!forceFullscreen ? handleMouseDown : undefined}
        isNavWindow={isNavWindow}
      >
        {children}
      </Window>
    </div>
  )
}

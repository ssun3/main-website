import { type ReactNode, useEffect, useState, useCallback, type MouseEvent } from "react"
interface WindowProps {
  title: string
  children: ReactNode
  className?: string
  onMaximize?: () => void
  onMinimize?: () => void
  onClose?: () => void
  isMaximized?: boolean
  onMouseDown?: (e: MouseEvent<HTMLDivElement>) => void
  isNavWindow?: boolean
}

export function Window({
  title,
  children,
  className = "",
  onMaximize,
  onMinimize,
  onClose,
  isMaximized,
  onMouseDown,
  isNavWindow = false,
}: WindowProps) {
  return (
    <div className={`border border-cyan-300 bg-gray-900 rounded-sm flex flex-col select-none ${className}`}>
      <div
        className="bg-cyan-200 px-2 py-1 flex items-center space-x-2 text-xs text-cyan-900 relative z-10 cursor-move select-none"
        onMouseDown={onMouseDown}
      >
        <div className="flex space-x-1">
          <button type="button" onClick={onClose} className="w-2 h-2 border border-cyan-600 hover:bg-red-500 transition-colors" />
          {!isNavWindow && (
            <button
              type="button"
              onClick={onMinimize}
              className="w-2 h-2 border border-cyan-600 hover:bg-yellow-500 transition-colors"
            />
          )}
        </div>
        <div className="flex-1 text-center">[{title}]</div>
        {!isNavWindow && (
          <button type="button" onClick={onMaximize} className="w-2 h-2 border border-cyan-600 hover:bg-cyan-600 transition-colors" />
        )}
      </div>
      <div
        className="p-4 relative flex-1 overflow-auto"
        style={
          {
            "--scrollbar-width": "12px",
            "--scrollbar-track": "#111827",
            "--scrollbar-thumb": "rgb(103, 232, 249)",
            scrollbarWidth: "thin",
            scrollbarColor: "rgb(103, 232, 249) #111827",
            msOverflowStyle: "none",
          } as React.CSSProperties
        }
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            width: var(--scrollbar-width);
          }
          div::-webkit-scrollbar-track {
            background: var(--scrollbar-track);
            border: 1px solid rgb(103, 232, 249);
          }
          div::-webkit-scrollbar-thumb {
            background-color: var(--scrollbar-thumb);
            border: 2px solid var(--scrollbar-track);
            border-radius: 0;
          }
        `}</style>
        {children}
      </div>
    </div>
  )
}

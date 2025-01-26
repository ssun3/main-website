import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './console.css'

export const metadata: Metadata = {
  title: 'Tetsuo Terminal',
  description: 'Enter the Void',
}

export default function ConsoleLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <div className="console-container">
      {children}
    </div>
  )
}

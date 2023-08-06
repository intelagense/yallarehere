import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Y\'all are here',
  description: 'Create a virtual doorbell for events.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="h-screen">{children}</body>
    </html>
  )
}

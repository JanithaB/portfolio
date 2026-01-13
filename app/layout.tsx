import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Janitha Rathnayake - IoT, Edge Computing & Backend Systems Engineer',
  description: 'Electrical & Electronics Engineer | IoT, Edge Computing & Backend Systems - Portfolio showcasing projects, skills, and experience.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}

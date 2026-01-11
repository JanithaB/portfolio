import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume - Janitha Rathnayake',
  description: 'Resume of Janitha Rathnayake - Systems Engineer specializing in IoT, Edge Computing & Backend Systems',
}

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

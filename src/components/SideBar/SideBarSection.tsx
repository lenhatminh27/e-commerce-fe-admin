import type { ReactNode } from "react"

interface SidebarSectionProps {
  title: string
  children: ReactNode
}

export function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div className="px-3 mb-2">
      <h3 className="text-xs font-medium text-white/50 px-3 mb-2">{title}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  )
}

import { Link } from "react-router-dom"
import type { ReactNode } from "react"

interface SidebarItemProps {
  icon?: ReactNode
  label: string
  to: string
  isActive?: boolean
  badge?: number
  className?: string
}

export function SidebarItem({
  icon,
  label,
  to,
  isActive = false,
  badge,
  className = "",
}: SidebarItemProps) {
  return (
    <Link
      to={to}
      className={`
        flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-md transition-colors
        ${
          isActive
            ? "bg-white text-gray-600 "
            : "text-white hover:text-white hover:bg-white/10 "
        }
        ${className}
      `}>
      {icon}
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1 rounded-full bg-white/20 text-xs font-medium">
          {badge}
        </span>
      )}
    </Link>
  )
}

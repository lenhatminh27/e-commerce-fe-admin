import { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { MenuItem } from "react-pro-sidebar"
import { Link, useLocation } from "react-router-dom"

interface SidebarItemProps {
  icon?: ReactNode
  label: string
  path: string
}

export function SidebarItem(props: SidebarItemProps) {
  const { icon, label, path } = props
  const location = useLocation()
  let isActive = false
  if (location.pathname === path) {
    isActive = true
  }
  const { t } = useTranslation()
  return (
    <MenuItem
      component={<Link to={path} />}
      icon={icon}
      active={isActive}
      className={
        "w-4/5 h-[40px] my-2 cursor-pointer flex items-center rounded-lg hover:!rounded-lg transition-all" +
        " " +
        (isActive && "bg-white text-gray-950 font-medium") +
        " " +
        (!isActive && "hover:bg-gray-600/50")
      }>
      {t(label)}
    </MenuItem>
  )
}

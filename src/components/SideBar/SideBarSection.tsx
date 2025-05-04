import { ReactNode } from "react"
import { useTranslation } from "react-i18next"

interface SidebarSectionProps {
  sectionName: string
  children: ReactNode
}

export function SidebarSection(props: SidebarSectionProps) {
  const { sectionName, children } = props
  const { t } = useTranslation()
  return (
    <div className="flex flex-col mt-10">
      <h5 className="ml-[20px]">{t(sectionName)}</h5>
      {children}
    </div>
  )
}

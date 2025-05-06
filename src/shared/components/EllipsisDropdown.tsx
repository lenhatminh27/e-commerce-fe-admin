import { Dropdown, DropdownMenu, DropdownTrigger } from "@heroui/react"
import { JSX } from "react"
import { FaEllipsis } from "react-icons/fa6"

interface EllipsisDropdownProps {
  className?: string
  children: JSX.Element | JSX.Element[]
}

interface EllipsisDropdownItemProps {
  children: JSX.Element | JSX.Element[]
}

export default function EllipsisDropdown({
  className,
  children,
}: EllipsisDropdownProps) {
  return (
    <Dropdown closeOnSelect={false}>
      <DropdownTrigger>
        <FaEllipsis
          className="rounded-3xl bg-gray-300 p-1 shadow-xl/20 hover:bg-gray-200"
          size="30"
        />
      </DropdownTrigger>
      <DropdownMenu className={className} closeOnSelect={false}>
        {children}
      </DropdownMenu>
    </Dropdown>
  )
}

export function EllipsisDropdownItem({ children }: EllipsisDropdownItemProps) {
  return <div className="flex font-medium">{children}</div>
}

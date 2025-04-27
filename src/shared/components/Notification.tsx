import {
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react"
import { FaRegBell } from "react-icons/fa"

function Notification() {
  return (
    <Dropdown placement="bottom-start">
      <Badge
        className="hidden md:flex"
        color="primary"
        content="5"
        showOutline={false}>
        <DropdownTrigger>
          <FaRegBell
            className="hidden md:flex transition-transform cursor-pointer focus:outline-non outline-none mt-1"
            color="white"
            size="20"
          />
        </DropdownTrigger>
      </Badge>
      <DropdownMenu variant="flat">
        <DropdownItem key="1">1</DropdownItem>
        <DropdownItem key="2">2</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default Notification

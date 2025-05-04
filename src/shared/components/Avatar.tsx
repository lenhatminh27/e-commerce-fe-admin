import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@heroui/react"
import { useNavigate } from "react-router-dom"
import { disconnectStomp } from "../lib/stompClient"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/auth/auth.slice"

interface AccountProps {
  className?: string
  name?: string
}
function Account(props: AccountProps) {
  const { className, name } = props
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = async () => {
    await disconnectStomp()
    dispatch(logout())
    navigate("/login", { replace: true })
  }
  return (
    <div className={className + " "}>
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: false,
              src: "",
            }}
            className="transition-transform text-white cursor-pointer"
            description=""
            name={<span className="md:ml-2 hidden md:inline">{name}</span>}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem
            key="profile"
            className="gap-2 md:hidden"
            textValue="name">
            <p className="font-bold">{name}</p>
          </DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            textValue="logout"
            onPress={handleLogout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default Account

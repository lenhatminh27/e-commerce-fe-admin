import { Image } from "@heroui/react"
import logo from "../assets/logo.png"
import brand from "../assets/brand.png"
import Search from "../shared/components/Search"
import Account from "../shared/components/Avatar"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import Notification from "../shared/components/Notification"
import Language from "../shared/components/Language"
import Message from "../shared/components/Message"

function Header() {
  const auth = useSelector((state: RootState) => state.auth)
  return (
    <div className="sticky bg-gray-950 grid grid-cols-12 flex-nowrap items-center w-full p-[10px] left-0 space-x-1 md:space-x-10 md:px-10">
      <div className="col-span-3 md:col-span-2 flex w-full md:w-3/4">
        <Image src={logo} className="md:hidden w-full" />
        <Image src={brand} className="hidden md:flex w-full" />
      </div>
      <div className="col-span-5 md:col-span-6 md:col-start-3 md:px-5">
        <Search type="dark" />
      </div>
      <div className="col-span-4 flex items-center justify-end space-x-10">
        <Message className="hidden md:flex" />
        <Notification className="hidden md:flex" />
        <Language className="" />
        <Account className="" name={auth.user?.name} />
      </div>
    </div>
  )
}

export default Header

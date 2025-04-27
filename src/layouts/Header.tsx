import { Image } from "@heroui/react"
import logo from "../assets/logo.png"
import brand from "../assets/brand.png"
import Search from "../shared/components/Search"
import Account from "../shared/components/Avatar"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import Notification from "../shared/components/Notification"
import { MdOutlineChat } from "react-icons/md"

function Header() {
  const auth = useSelector((state: RootState) => state.auth)
  return (
    <div className="sticky bg-gray-950 grid grid-cols-12 items-center w-full p-[10px] left-0 space-x-1 md:space-x-10 md:px-10">
      <div className="col-span-3 md:col-span-2 flex w-full md:w-3/4">
        <Image src={logo} className="md:hidden w-full" />
        <Image src={brand} className="hidden md:flex w-full" />
      </div>
      <div className="col-span-6 md:col-span-7 md:col-start-3 md:px-5">
        <Search type="dark" />
      </div>
      <div className="col-span-3 md:col-span-3 flex content-end space-x-5">
        <MdOutlineChat className="hidden md:block" color="white" size="30" />
        <Notification />
        <Account className="md:w-full m-0 md:mr-0" name={auth.user?.name} />
      </div>
    </div>
  )
}

export default Header

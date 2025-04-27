import { useLocation } from "react-router-dom"
import {
  HiHome,
  HiTag,
  HiFolder,
  HiUser,
  HiChartBar,
  HiChat,
  HiQuestionMarkCircle,
  HiMenu,
  HiPlus,
} from "react-icons/hi"
import { FaStar } from "react-icons/fa"
import { IoNotifications } from "react-icons/io5"
import { SidebarItem } from "../components/SideBar/SideBarItem"
import { SidebarSection } from "../components/SideBar/SideBarSection"
import { useEffect, useState } from "react"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const location = useLocation()
  const currentPath = location.pathname

  useEffect(() => {
    const checkScreen = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }
    checkScreen()
    window.addEventListener("resize", checkScreen)
    return () => window.removeEventListener("resize", checkScreen)
  }, [])

  return (
    <div className={`flex bg-gray-100 ${!isOpen && "-ml-[200px]"}`}>
      <div className="w-[200px] md:w-[300px] py-[10px] px-[10px] h-full bg-blue-950 text-white flex flex-col overflow-y-auto scrollbar-hide">
        <div className="flex-1">
          <nav className="space-y-1 px-3">
            <SidebarItem
              icon={<HiHome className="h-5 w-5" />}
              label="Dashboard"
              to="/dashboard"
              isActive={currentPath === "/dashboard"}
            />
            <SidebarItem
              icon={<HiMenu className="h-5 w-5" />}
              label="Orders"
              to="/orders"
              isActive={currentPath === "/orders"}
              badge={16}
            />
            <SidebarItem
              icon={<HiTag className="h-5 w-5" />}
              label="Products"
              to="/products"
              isActive={currentPath === "/products"}
            />
            <SidebarItem
              icon={<HiFolder className="h-5 w-5" />}
              label="Categories"
              to="/categories"
              isActive={currentPath === "/categories"}
            />
            <SidebarItem
              icon={<HiUser className="h-5 w-5" />}
              label="Customers"
              to="/customers"
              isActive={currentPath === "/customers"}
            />
            <SidebarItem
              icon={<HiChartBar className="h-5 w-5" />}
              label="Reports"
              to="/reports"
              isActive={currentPath === "/reports"}
            />
            <SidebarItem
              icon={<FaStar className="h-5 w-5" />}
              label="Coupons"
              to="/coupons"
              isActive={currentPath === "/coupons"}
            />
            <SidebarItem
              icon={<HiChat className="h-5 w-5" />}
              label="Inbox"
              to="/inbox"
              isActive={currentPath === "/inbox"}
            />
          </nav>
        </div>
        <div className="mt-6 mb-6">
          <SidebarSection title="Other Information">
            <SidebarItem
              icon={<HiQuestionMarkCircle className="h-5 w-5" />}
              label="Knowledge Base"
              to="/knowledge-base"
              isActive={currentPath === "/knowledge-base"}
            />
            <SidebarItem
              icon={<IoNotifications className="h-5 w-5" />}
              label="Product Updates"
              to="/product-updates"
              isActive={currentPath === "/product-updates"}
            />
          </SidebarSection>

          <SidebarSection title="Other Information">
            <SidebarItem
              icon={<HiQuestionMarkCircle className="h-5 w-5" />}
              label="Knowledge Base"
              to="/knowledge-base"
              isActive={currentPath === "/knowledge-base"}
            />
            <SidebarItem
              icon={<IoNotifications className="h-5 w-5" />}
              label="Product Updates"
              to="/product-updates"
              isActive={currentPath === "/product-updates"}
            />
          </SidebarSection>
          <SidebarSection title="Other Information">
            <SidebarItem
              icon={<HiQuestionMarkCircle className="h-5 w-5" />}
              label="Knowledge Base"
              to="/knowledge-base"
              isActive={currentPath === "/knowledge-base"}
            />
            <SidebarItem
              icon={<IoNotifications className="h-5 w-5" />}
              label="Product Updates"
              to="/product-updates"
              isActive={currentPath === "/product-updates"}
            />
          </SidebarSection>
        </div>
      </div>
      <div>
        <div
          className="rounded-full w-auto h-auto bg-white mt-5 ml-5"
          onClick={() => setIsOpen(!isOpen)}>
          <HiPlus size="32" />
        </div>
      </div>
    </div>
  )
}

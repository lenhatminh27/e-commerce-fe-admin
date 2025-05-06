import { Menu, Sidebar } from "react-pro-sidebar"
import { SidebarItem } from "../components/SideBar/SideBarItem"
import { CiHome } from "react-icons/ci"
import { MdList, MdPeopleAlt } from "react-icons/md"
import { useEffect, useState } from "react"
import useWindowSize from "../shared/hooks/useWindowSize"
import { IoMenu } from "react-icons/io5"
import { AiOutlineTag } from "react-icons/ai"
import { FaRegFolder } from "react-icons/fa"
import { SidebarSection } from "../components/SideBar/SideBarSection"
import { PiChartBar } from "react-icons/pi"
import { IoMdPerson, IoMdSettings } from "react-icons/io"
import { t } from "i18next"

function SideBar() {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const { width } = useWindowSize()

  useEffect(() => {
    if (width < 768) {
      setCollapsed(true)
    } else setCollapsed(false)
  }, [width])

  const menu = collapsed ? 20 : 285

  return (
    <div className="flex flex-row">
      <IoMenu
        size="30"
        className="fixed top-[80px] p-1 z-10 cursor-pointer bg-gray-500 text-white transition-all duration-300 rounded-3xl"
        style={{ left: menu }}
        onClick={() => setCollapsed(!collapsed)}
      />

      <Sidebar
        collapsed={collapsed}
        onBackdropClick={() => setCollapsed(true)}
        onToggle={() => setCollapsed(!collapsed)}
        className="h-full"
        collapsedWidth="0px"
        width="300px">
        <Menu
          closeOnClick={true}
          className="bg-blue-950 text-white p-3 h-full scrollbar-hide"
          menuItemStyles={{
            button: {
              width: "80%",
              ":hover": {
                backgroundColor: "transparent",
                scale: "1.1",
              },
            },
          }}>
          <SidebarItem
            icon={<CiHome size="20" />}
            label={"dashboard.title"}
            path="/dashboard"
          />
          <SidebarItem
            icon={<MdList size="20" />}
            label={"orders.title"}
            path="/orders"
          />
          <SidebarItem
            icon={<AiOutlineTag size="20" />}
            label={"products.title"}
            path="/products"
          />
          <SidebarItem
            icon={<FaRegFolder size="20" />}
            label={"categories.title"}
            path="/categories"
          />
          <SidebarItem
            icon={<MdPeopleAlt size="20" />}
            label={"customers.title"}
            path="/customers"
          />
          <SidebarItem
            icon={<PiChartBar size="20" />}
            label={"reports.title"}
            path="/reports"
          />
          <SidebarSection sectionName={"settings.title"}>
            <SidebarItem
              icon={<IoMdPerson size="20" />}
              label={"settings.personalSetting.title"}
              path="/personal-setting"
            />
            <SidebarItem
              icon={<IoMdSettings size="20" />}
              label={"settings.globalSetting.title"}
              path="/global-setting"
            />
          </SidebarSection>
        </Menu>
      </Sidebar>
    </div>
  )
}

export default SideBar

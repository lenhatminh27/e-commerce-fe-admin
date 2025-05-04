import {
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react"
import { useEffect, useState } from "react"
import { FaRegBell } from "react-icons/fa"
import { instance } from "../lib/axios"
import { Response } from "../types/response.type"
import {
  NotificationContent,
  NotificationPaging,
  NotificationResponse,
} from "../types/notification"
import { GoDotFill } from "react-icons/go"

interface NotificationProps {
  className?: string
}

function Notification(props: NotificationProps) {
  const { className } = props
  const [notifications, setNotification] = useState<NotificationContent[]>([])
  const [page, setPage] = useState<NotificationPaging>({
    pageNumber: 0,
    pageSize: 0,
    totalPage: 0,
    totalRecord: 0,
  })

  const handleScroll = (e: React.UIEvent<HTMLUListElement>) => {
    const target = e.currentTarget
    const isAtBottom =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 1

    if (isAtBottom && page.pageNumber < page.totalPage) {
      getNotification(page.pageNumber + 1)
    }
  }

  const getNotification = async (pageNumber = 1) => {
    const response = await instance.get(
      `/api/v1/notification?page=${pageNumber}`
    )
    const resData: Response<NotificationResponse> = response.data
    setNotification((prev) => [...prev, ...resData.data.contents])
    setPage(resData.data.paging)
  }

  useEffect(() => {
    getNotification()
  }, [])
  return (
    <div className={className}>
      <Dropdown placement="bottom-start">
        <Badge
          className="hidden md:flex"
          color="primary"
          content=""
          showOutline={false}>
          <DropdownTrigger>
            <FaRegBell
              className="hidden md:flex transition-transform cursor-pointer focus:outline-non outline-none mt-1"
              color="white"
              size="20"
            />
          </DropdownTrigger>
        </Badge>
        <DropdownMenu
          variant="flat"
          className="max-h-[500px] w-[400px] overflow-y-auto"
          onScroll={handleScroll}>
          {notifications.map((notification) => (
            <DropdownItem
              className={"h-[70px]"}
              key={notification.id}
              textValue={notification.content}>
              <div className=" flex justify-between">
                {notification.id}
                <GoDotFill className="text-blue-500" size="20" />
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default Notification

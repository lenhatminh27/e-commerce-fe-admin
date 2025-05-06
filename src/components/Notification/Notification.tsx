import {
  addToast,
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
} from "@heroui/react"
import { useEffect, useState } from "react"
import { FaRegBell } from "react-icons/fa"
import { instance } from "../../shared/lib/axios"
import { Response } from "../../shared/types/response.type"
import {
  NotificationContent,
  NotificationPaging,
  NotificationResponse,
} from "../../shared/types/notification"
import { GoDotFill } from "react-icons/go"
import { t } from "i18next"
import NotificationIcon from "./NotificationIcon"
import {
  countTime,
  shorteningNotificationContent,
} from "../../shared/utils/helper"
import NotificationSetting from "./NotificationSetting"
import NotificationSkeleton from "./NotificationSkeleton"

interface NotificationProps {
  className?: string
}
function Notification(props: NotificationProps) {
  const { className } = props
  const [notifications, setNotifications] = useState<NotificationContent[]>([])
  const [notiItem, setNotiItem] = useState<NotificationContent | null>(null)
  const [page, setPage] = useState<NotificationPaging>({
    pageNumber: 0,
    pageSize: 0,
    totalPage: 0,
    totalRecord: 0,
  })
  const [isFetching, setIsFetching] = useState<boolean>(false)

  const handleScroll = async (e: React.UIEvent<HTMLUListElement>) => {
    const target = e.currentTarget
    const isAtBottom =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 1

    if (isAtBottom && page.pageNumber < page.totalPage && !isFetching) {
      setIsFetching(true)
      await new Promise((resolve) => {
        setTimeout(async () => {
          await getNotifications(page.pageNumber + 1)
          resolve(null)
        }, 1000)
      })
      setIsFetching(false)
    }
  }

  const getNotifications = async (pageNumber = 1) => {
    try {
      const response = await instance.get(
        `/api/v1/notification?page=${pageNumber}&size=5`
      )
      const resData: Response<NotificationResponse> = response.data
      setNotifications((prev) => [...prev, ...resData.data.contents])
      setPage(resData.data.paging)
    } catch (error) {
      console.error(error)
    }
  }

  const handleMarkAsRead = async () => {
    try {
      const response = await instance.put(
        `/api/v1/notification/${notiItem?.id}`
      )

      if (response.status === 204) {
        const newNotis = notifications.map((item) => {
          if (item.id === notiItem?.id) {
            return { ...item, isRead: true }
          } else return item
        })
        setNotifications(newNotis)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteNotification = async () => {
    try {
      const response = await instance.delete(
        `/api/v1/notification/${notiItem?.id}`
      )

      if (response.status === 204) {
        const newNotis = notifications.filter(
          (item) => item.id !== notiItem?.id
        )
        setNotifications(newNotis)
        addToast({
          title: t("notification.deleteNotification.toast"),
        })
      }
    } catch (error) {}
  }

  useEffect(() => {
    getNotifications()
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
          className="max-h-[300px] w-[400px] overflow-y-auto"
          onScroll={handleScroll}
          closeOnSelect={false}>
          <>
            {notifications.map((notification) => (
              <DropdownItem
                className={"h-[70px] hover:!bg-gray-100"}
                key={notification.id}
                textValue={notification.content}
                closeOnSelect={false}
                onMouseOver={() => setNotiItem(notification)}>
                <div className=" flex justify-between">
                  <div className="flex space-x-3">
                    <NotificationIcon type={notification.type} />
                    <Tooltip
                      content={notification.content}
                      className="w-[500px]"
                      closeDelay={0}>
                      <div className="relative -mt-[15px] min-w-[100px]">
                        <a href={notification.targetUrl}>
                          {shorteningNotificationContent(notification.content)}
                        </a>
                        <p className="text-sky-500 font-bold absolute -bottom-[15px]">
                          {countTime(new Date(notification.createdAt))}
                        </p>
                      </div>
                    </Tooltip>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    onClick={(e) => {
                      e.stopPropagation()
                    }}>
                    {notification.id === notiItem?.id && (
                      <NotificationSetting
                        isRead={notification.isRead}
                        onReadNotification={handleMarkAsRead}
                        onDeleteNotification={handleDeleteNotification}
                      />
                    )}
                    {!notification.isRead && (
                      <GoDotFill className="text-blue-500" size="20" />
                    )}
                  </div>
                </div>
              </DropdownItem>
            ))}
            {notifications.length < page.totalRecord && (
              <DropdownItem key="" textValue="" className="h-[70px]">
                <NotificationSkeleton />
              </DropdownItem>
            )}
          </>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default Notification

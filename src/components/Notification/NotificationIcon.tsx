import { FaCalendarAlt } from "react-icons/fa"
import { NotificationType } from "../../shared/types/notification"
import { IoIosAlert } from "react-icons/io"
import { FaEllipsis } from "react-icons/fa6"
import { GrSystem } from "react-icons/gr"
import { AiFillMessage } from "react-icons/ai"

interface NotificationIconProps {
  type: NotificationType
}

function NotificationIcon({ type }: NotificationIconProps) {
  const className = "min-w-[30px]"
  const size = 30

  switch (type) {
    case NotificationType.APPOINTMENT:
      return (
        <FaCalendarAlt className={`${className} text-blue-500`} size={size} />
      )
    case NotificationType.ALERT:
      return <IoIosAlert className={`${className} text-red-400`} size={size} />
    case NotificationType.MESSAGE:
      return (
        <AiFillMessage className={`${className} text-teal-500`} size={size} />
      )
    case NotificationType.SYSTEM:
      return <GrSystem className={`${className} text-gray-600`} size={size} />
    case NotificationType.OTHER:
    default:
      return <FaEllipsis className={`${className} text-gray-400`} size={size} />
  }
}

export default NotificationIcon

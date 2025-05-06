import { t } from "i18next"
import EllipsisDropdown, {
  EllipsisDropdownItem,
} from "../../shared/components/EllipsisDropdown"
import { DropdownItem } from "@heroui/react"
import { IoMailUnread, IoTrash } from "react-icons/io5"

interface NotificationSettingProps {
  isRead: boolean
  onReadNotification: () => void
  onDeleteNotification: () => void
}

export default function NotificationSetting({
  isRead,
  onReadNotification,
  onDeleteNotification,
}: NotificationSettingProps) {
  return (
    <EllipsisDropdown className="w-[200px]">
      {!isRead ? (
        <DropdownItem
          key="markAsRead"
          textValue="markAsRead"
          onPress={onReadNotification}
          closeOnSelect={false}
          className="flex">
          <EllipsisDropdownItem>
            <IoMailUnread size="18" />
            <p className="ml-1">{t("notification.markAsRead")}</p>
          </EllipsisDropdownItem>
        </DropdownItem>
      ) : (
        <></>
      )}
      <DropdownItem
        key="delete"
        textValue="delete"
        onPress={onDeleteNotification}
        closeOnSelect={false}>
        <EllipsisDropdownItem>
          <IoTrash size="18" />
          <p className="ml-1">{t("notification.deleteNotification")}</p>
        </EllipsisDropdownItem>
      </DropdownItem>
    </EllipsisDropdown>
  )
}

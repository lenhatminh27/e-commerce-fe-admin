export interface NotificationResponse {
  paging: NotificationPaging
  contents: NotificationContent[]
}

export interface NotificationContent {
  id: number
  content: string
  type: NotificationType
  isRead: boolean
  targetUrl: string
  createdAt: Date
}

export interface NotificationPaging {
  pageNumber: number
  pageSize: number
  totalPage: number
  totalRecord: number
}

export enum NotificationType {
  APPOINTMENT = "APPOINTMENT",
  MESSAGE = "MESSAGE",
  SYSTEM = "SYSTEM",
  ALERT = "ALERT",
  OTHER = "OTHER",
}

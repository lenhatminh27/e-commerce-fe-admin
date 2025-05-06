import { t } from "i18next"

export function shorteningNotificationContent(
  content: string,
  maxLength = 70
): string {
  if (!content) return ""
  return content.length > maxLength
    ? content.slice(0, maxLength).trimEnd() + "..."
    : content
}

export function countTime(from: Date) {
  const time = Date.now() - from.getTime()

  const SECOND = 1000
  const MINUTE = 60 * SECOND
  const HOUR = 60 * MINUTE
  const DAY = 24 * HOUR
  const WEEK = 7 * DAY
  const MONTH = 30 * DAY
  const YEAR = 365 * DAY

  if (time < MINUTE) {
    return Math.ceil(time / SECOND) + " " + t("time.second")
  }
  if (time < HOUR) {
    return Math.ceil(time / MINUTE) + " " + t("time.minute")
  }
  if (time < DAY) {
    return Math.ceil(time / HOUR) + " " + t("time.hour")
  }
  if (time < WEEK) {
    return Math.ceil(time / DAY) + " " + t("time.day")
  }
  if (time < MONTH) {
    return Math.ceil(time / WEEK) + " " + t("time.week")
  }
  if (time < YEAR) {
    return Math.ceil(time / MONTH) + " " + t("time.month")
  }

  return Math.ceil(time / YEAR) + " " + t("time.year")
}

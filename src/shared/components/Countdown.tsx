import { useMemo } from "react"
import Countdown from "react-countdown"

interface CustomCountdownProps {
  key?: number
  start?: number
  time: number
  rendered: (props: any) => any
  onComplete?: () => void
}

function CustomCountdown(props: CustomCountdownProps) {
  const { key, start, time, rendered, onComplete } = props
  const targetTime = useMemo(
    () => (start ? start + time : new Date(Date.now() + time)),
    [start, time]
  )

  return (
    <Countdown
      key={key}
      date={targetTime}
      renderer={rendered}
      onComplete={onComplete}
    />
  )
}

export default CustomCountdown

import { useMemo } from "react"
import Countdown from "react-countdown"

interface CustomCountdownProps {
  start?: number
  time: number
  rendered: (props: any) => any
}

function CustomCountdown(props: CustomCountdownProps) {
  const { start, time, rendered } = props
  const targetTime = useMemo(
    () => (start ? start + time : new Date(Date.now() + time)),
    [start, time]
  )

  return <Countdown date={targetTime} renderer={rendered} />
}

export default CustomCountdown

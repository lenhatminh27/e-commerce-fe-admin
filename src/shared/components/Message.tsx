import { Badge } from "@heroui/react"
import { BsChatLeftText } from "react-icons/bs"

interface MessageProps {
  className?: string
}

function Message(props: MessageProps) {
  const { className } = props
  return (
    <div className={className + " "}>
      <Badge content="5" color="primary" showOutline={false}>
        <BsChatLeftText
          className="hidden md:flex transition-transform cursor-pointer focus:outline-non outline-none mt-1"
          color="white"
          size="20"
        />
      </Badge>
    </div>
  )
}

export default Message

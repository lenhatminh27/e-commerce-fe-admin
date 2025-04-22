import { Button } from "@heroui/react"

interface ButtonProps {
  children?: any
  className?: string
  onPress?: () => void
}
function CustomButton(props: ButtonProps) {
  const { children, className, onPress } = props
  return (
    <Button onPress={onPress} className={className + " rounded-sm"}>
      {children}
    </Button>
  )
}

export default CustomButton

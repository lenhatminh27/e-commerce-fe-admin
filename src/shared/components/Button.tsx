import { Button } from "@heroui/react"

interface ButtonProps {
  children?: any
  className?: string
  onPress?: () => void
  disabled?: boolean
}
function CustomButton(props: ButtonProps) {
  const { children, className, onPress, disabled } = props
  return (
    <Button
      onPress={onPress}
      className={className + " rounded-sm"}
      isDisabled={disabled}>
      {children}
    </Button>
  )
}

export default CustomButton

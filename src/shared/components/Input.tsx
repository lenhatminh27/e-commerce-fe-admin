import { Input } from "@heroui/react"

interface InputProps {
  name?: string
  type?: string
  content?: string
  isInvalid?: boolean
  errorMessage?: string
  placeholder?: string
  className?: string
  value?: string
  onChange?: (e: any) => void
}

function CustomInput(props: InputProps) {
  const {
    name,
    type,
    content,
    isInvalid,
    errorMessage,
    placeholder,
    className,
    value,
    onChange,
  } = props
  return (
    <Input
      name={name}
      type={type}
      label={content}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      labelPlacement="outside"
      placeholder={placeholder}
      className={className}
      radius="sm"
      variant="bordered"
      value={value}
      onChange={onChange}
    />
  )
}

export default CustomInput

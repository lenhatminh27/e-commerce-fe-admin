import { Input } from "@heroui/react"
import { CiSearch } from "react-icons/ci"

interface SearchProps {
  type?: "dark" | "light"
}

function Search(props: SearchProps) {
  const { type } = props
  if (type && type === "dark")
    return (
      <Input
        startContent={<CiSearch size="25" className="text-white" />}
        placeholder="Search..."
        classNames={{
          input: "placeholder:text-white !text-white focus:!bg-gray-900",
          inputWrapper:
            "bg-transparent hover:!bg-gray-800 data-[focus=true]:bg-gray-800",
        }}
      />
    )
  return (
    <Input
      startContent={<CiSearch size="25" />}
      placeholder="Search..."
      classNames={{
        inputWrapper: ["bg-transparent"],
      }}
    />
  )
}

export default Search

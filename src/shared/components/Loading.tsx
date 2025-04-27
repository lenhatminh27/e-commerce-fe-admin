import { Spinner } from "@heroui/react"
import ReactDOM from "react-dom"

function Loading() {
  return ReactDOM.createPortal(
    <div className="fixed w-full h-full flex content-center items-center top-0 bg-gray-200/50">
      <Spinner className="w-full" size="lg" />
    </div>,
    document.getElementById("modal-root") as HTMLElement
  )
}

export default Loading

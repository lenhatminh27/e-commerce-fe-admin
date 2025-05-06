import { HeroUIProvider, ToastProvider } from "@heroui/react"
import AppRouter from "./routers/AppRouter"

function App() {
  return (
    <HeroUIProvider>
      <ToastProvider />
      <div className="font-light">
        <AppRouter />
      </div>
    </HeroUIProvider>
  )
}

export default App

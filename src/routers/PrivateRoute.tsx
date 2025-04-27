import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { Navigate } from "react-router-dom"
import Header from "../layouts/Header"
import SideBar from "../layouts/SideBar"

function PrivateRoute(props: any) {
  const { children } = props
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )
  if (isAuthenticated)
    return (
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <SideBar />
          <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
            {children}
          </div>
        </div>
      </div>
    )
  return <Navigate to={"/login"} />
}

export default PrivateRoute

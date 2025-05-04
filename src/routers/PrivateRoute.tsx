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
        <div className="flex flex-1 overflow-hidden bg-gray-100">
          <SideBar />
          <div className="container flex-1 overflow-y-auto ">{children}</div>
        </div>
      </div>
    )
  return <Navigate to={"/login"} />
}

export default PrivateRoute

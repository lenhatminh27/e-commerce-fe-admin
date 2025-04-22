import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { Navigate } from "react-router-dom"

function PrivateRoute(props: any) {
  const { children } = props
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )
  if (isAuthenticated) return <>{children}</>
  return <Navigate to={"/login"} />
}

export default PrivateRoute

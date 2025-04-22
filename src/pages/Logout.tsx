import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { logout } from "../redux/auth/auth.slice"

function Logout() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(logout())
  }, [])
  return <></>
}

export default Logout

import { lazy } from "react"
import { Route } from "../shared/types/route"

export const publicRoutes: Route[] = [
  {
    path: "/login",
    component: lazy(() => import("../pages/Login")),
  },
  {
    path: "/reset-password",
    component: lazy(() => import("../pages/ResetPassword")),
  },
]

export const privateRoutes: Route[] = [
  {
    path: "/dashboard",
    component: lazy(() => import("../pages/Dashboard")),
  },
  {
    path: "/logout",
    component: lazy(() => import("../pages/Logout")),
  },
]

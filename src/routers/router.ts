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
  {
    path: "*",
    component: lazy(() => import("../pages/NotFound")),
  },
]

export const privateRoutes: Route[] = [
  {
    path: "/dashboard",
    component: lazy(() => import("../pages/Dashboard")),
  },
  {
    path: "/orders",
    component: lazy(() => import("../pages/Order")),
  },
  {
    path: "/logout",
    component: lazy(() => import("../pages/Logout")),
  },
]

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
    component: lazy(() => import("../pages/Orders")),
  },
  {
    path: "/products",
    component: lazy(() => import("../pages/Products")),
  },
  {
    path: "/categories",
    component: lazy(() => import("../pages/Categories")),
  },
  {
    path: "/customers",
    component: lazy(() => import("../pages/Customers")),
  },
  {
    path: "/reports",
    component: lazy(() => import("../pages/Reports")),
  },
  {
    path: "/personal-setting",
    component: lazy(() => import("../pages/PersonalSetting")),
  },
  {
    path: "/global-setting",
    component: lazy(() => import("../pages/GlobalSetting")),
  },
]

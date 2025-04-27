import { Suspense } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Loading from "../shared/components/Loading"
import { publicRoutes, privateRoutes } from "./router"
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <PublicRoute>
                  <route.component />
                </PublicRoute>
              }
            />
          ))}
          {privateRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <PrivateRoute>
                  <route.component />
                </PrivateRoute>
              }
            />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRouter

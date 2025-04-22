import { Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Loading from "../shared/components/Loading/Loading"
import { publicRoutes, privateRoutes } from "./router"
import PrivateRoute from "./PrivateRoute"

function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {publicRoutes.map((route) => (
            <Route path={route.path} element={<route.component />} />
          ))}
          {privateRoutes.map((route) => (
            <Route
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

export default Router

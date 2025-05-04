import { configureStore } from "@reduxjs/toolkit"
import { authApi } from "./auth/auth.service"
import { accountApi } from "./account/account.service"
import authReducer from "./auth/auth.slice"
import subcriptionReducer from "./subscription/subscription.slice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    subcriptions: subcriptionReducer,
    [authApi.reducerPath]: authApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, accountApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

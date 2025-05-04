import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { LoginResponse } from "../../shared/types/auth"
import { ACCESS_TOKEN, USER_CURRENT } from "../../shared/constants/user"

interface AuthState {
  user: Omit<LoginResponse, "accessToken"> | null
  accessToken: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem(USER_CURRENT) as string) || null,
  accessToken: localStorage.getItem(ACCESS_TOKEN) || null,
  isAuthenticated: !!localStorage.getItem(USER_CURRENT),
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<LoginResponse>) => {
      const { accessToken, ...rest } = action.payload
      state.user = rest
      state.accessToken = accessToken.token
      state.isAuthenticated = true
      localStorage.setItem(USER_CURRENT, JSON.stringify(rest))
      localStorage.setItem(ACCESS_TOKEN, accessToken.token)
    },
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.isAuthenticated = false
      localStorage.removeItem(USER_CURRENT)
      localStorage.removeItem(ACCESS_TOKEN)
    },
  },
})

export const { setAuth, logout } = authSlice.actions
export default authSlice.reducer

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { LoginResponse } from "../../shared/types/auth"
import { USER_CURRENT } from "../../shared/constants/user"

interface AuthState {
  user: LoginResponse | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: localStorage.getItem(USER_CURRENT)
    ? JSON.parse(localStorage.getItem(USER_CURRENT) as string)
    : null,
  isAuthenticated: !!localStorage.getItem(USER_CURRENT),
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload
      state.isAuthenticated = true
      localStorage.setItem(USER_CURRENT, JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      localStorage.removeItem(USER_CURRENT)
    },
  },
})

export const { setAuth, logout } = authSlice.actions
export default authSlice.reducer

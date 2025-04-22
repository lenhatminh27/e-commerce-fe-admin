import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { LoginRequest, LoginResponse } from "../../shared/types/auth"
import { setAuth } from "./auth.slice"

const apiUrl = import.meta.env.VITE_APIURL

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "sign-in",
        method: "POST",
        body,
      }),
      transformResponse: (response: any): LoginResponse => {
        return {
          accessToken: response.data.accessToken,
          name: response.data.name,
          username: response.data.username,
        }
      },
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        try {
          const response = await queryFulfilled
          dispatch(setAuth(response.data))
        } catch (err) {
          console.error("Login error", err)
        }
      },
    }),
  }),
})

export const { useLoginMutation } = authApi

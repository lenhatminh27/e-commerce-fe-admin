import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { LoginRequest, LoginResponse } from "../../shared/types/auth"
import { setAuth } from "./auth.slice"
import { Response } from "../../shared/types/response.type"

const apiUrl = import.meta.env.VITE_API_URL

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
      transformResponse: (response: Response<LoginResponse>): LoginResponse => {
        return response.data
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

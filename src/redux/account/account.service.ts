import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  ChangePasswordRequest,
  ForgotPasswordRequest,
  VerifyCodeRequest,
  VerifyCodeResponse,
} from "../../shared/types/account"
import { Response } from "../../shared/types/response.type"
import { LANGUAGE } from "../../shared/constants/language"

const apiUrl = import.meta.env.VITE_API_URL

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    credentials: "include",
    prepareHeaders: (headers) => {
      const language = localStorage.getItem(LANGUAGE)
      if (language) {
        headers.set("Accept-Language", `${language}`)
      }
      return headers
    },
  }),
  endpoints: (build) => ({
    forgotPassword: build.mutation<void, ForgotPasswordRequest>({
      query: (body) => ({
        url: "forgot-password",
        method: "POST",
        body,
      }),
    }),
    verifyCode: build.mutation<VerifyCodeResponse, VerifyCodeRequest>({
      query: (body) => ({ url: "verify-code", method: "POST", body }),
      transformResponse: (
        response: Response<VerifyCodeResponse>
      ): VerifyCodeResponse => {
        return response.data
      },
    }),
    changePassword: build.mutation<void, ChangePasswordRequest>({
      query: (body) => ({ url: "change-password", method: "POST", body }),
    }),
  }),
})

export const {
  useForgotPasswordMutation,
  useVerifyCodeMutation,
  useChangePasswordMutation,
} = accountApi

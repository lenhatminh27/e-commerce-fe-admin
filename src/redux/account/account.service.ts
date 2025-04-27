import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  ChangePasswordRequest,
  ForgotPasswordRequest,
  VerifyCodeRequest,
  VerifyCodeResponse,
} from "../../shared/types/account"
import { Response } from "../../shared/types/response.type"

const apiUrl = import.meta.env.VITE_APIURL

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
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

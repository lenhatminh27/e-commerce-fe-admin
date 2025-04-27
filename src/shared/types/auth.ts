import { AccountInfo } from "./account"

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginError {
  username?: string
  password?: string
}

export interface LoginResponse {
  accountInfo: AccountInfo
  accessToken: Token
  username: string
  name: string
}

export interface Token {
  token: string
  expires: string
  type: string
}

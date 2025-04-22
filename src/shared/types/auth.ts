export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  accessToken: {
    token: string
    expires: string
    type: string
  }
  username: string
  name: string
}

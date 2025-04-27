export interface VerifyCodeRequest {
  email: string
  code: string
}

export interface VerifyCodeResponse {
  resetToken: string
}

export interface VerifyCodeError {
  email?: string
  code?: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface AccountInfo {
  firstName: string
  lastName: string
}

export interface ChangePasswordRequest {
  email: string
  resetToken: string
  newPassword: string
}

export interface StatusResponse {
  code: number
  message: string
  timestamp: Date
}

export interface Response<T> {
  status: StatusResponse
  data: T
}

export interface ErrorResponse<T> {
  status: StatusResponse
  data: Error<T>
}

export interface Error<T> {
  error: T
}

import axios from "axios"
import { ACCESS_TOKEN } from "../constants/user"
import { LANGUAGE } from "../constants/language"

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

instance.interceptors.request.use(
  (config) => {
    const rawToken = localStorage.getItem(ACCESS_TOKEN)
    const language = localStorage.getItem(LANGUAGE)

    if (config.headers) {
      if (rawToken) config.headers.Authorization = `Bearer ${rawToken}`
      if (language) config.headers["Accept-Language"] = language
    }

    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  function (response) {
    const newToken = response.headers["x-new-access-token"]
    console.log(newToken)
    console.log(response.headers)
    if (newToken) {
      localStorage.setItem(ACCESS_TOKEN, newToken)
    }
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

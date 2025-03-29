import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'

const baseURL = 'https://reqres.in/api/' // to be stored in .env file

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ error: string }>) => {
    const message = error.response?.data?.error || 'An error occurred'
    toast.error(message)
    return Promise.reject(error)
  }
) 
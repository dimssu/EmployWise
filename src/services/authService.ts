import { api } from '../helpers/apiHelpers'

interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  token: string
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('login', credentials)
    localStorage.setItem('token', response.data.token)
    return response.data
  },

  logout() {
    localStorage.removeItem('token')
  }
} 
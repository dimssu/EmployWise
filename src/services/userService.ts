import { api } from '../helpers/apiHelpers'

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

interface UsersResponse {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: User[]
}

export const userService = {
  async getUsers(page: number = 1): Promise<UsersResponse> {
    const response = await api.get<UsersResponse>(`/users?page=${page}`)
    return response.data
  },

  async getUserById(id: number): Promise<User> {
    const response = await api.get<{ data: User }>(`/users/${id}`)
    return response.data.data
  },

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const response = await api.put<{ data: User }>(`/users/${id}`, userData)
    return response.data.data
  }
} 
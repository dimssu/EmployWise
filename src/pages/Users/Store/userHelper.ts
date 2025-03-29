import { toast } from 'react-toastify'
import { userService } from '../../../services/userService'
import { store } from '../../../redux/store'
import { fetchUsers } from '../../../redux/slices/userSlice'

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

interface Handlers {
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

export async function fetchUsersList(page: number = 1, handlers?: Handlers) {
  try {
    const response = await userService.getUsers(page)
    store.dispatch(fetchUsers(page))
    handlers?.onSuccess?.(response)
  } catch (error) {
    toast.error('Failed to fetch users. Please try again later.')
    handlers?.onError?.(error)
  }
}

export async function updateUserData(
  id: number, 
  userData: Partial<User>, 
  handlers?: Handlers
) {
  try {
    const response = await userService.updateUser(id, userData)
    toast.success('User updated successfully')
    handlers?.onSuccess?.(response)
    return response
  } catch (error) {
    toast.error('Failed to update user. Please try again later.')
    handlers?.onError?.(error)
    throw error
  }
}

export async function getUserDetails(id: number, handlers?: Handlers) {
  try {
    const response = await userService.getUserById(id)
    handlers?.onSuccess?.(response)
    return response
  } catch (error) {
    toast.error('Failed to fetch user details. Please try again later.')
    handlers?.onError?.(error)
    throw error
  }
}

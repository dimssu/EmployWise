import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { userService } from '../../pages/Users/Store/userService'

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

interface UserState {
  users: User[]
  currentPage: number
  totalPages: number
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  users: [],
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null
}

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await userService.getUsers(page)
      return response
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>
      return rejectWithValue(err.response?.data?.error || 'Failed to fetch users')
    }
  }
)

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (
    { id, userData }: { id: number; userData: Partial<User> },
    { rejectWithValue }
  ) => {
    try {
      const response = await userService.updateUser(id, userData)
      toast.success('User updated successfully')
      return response
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>
      toast.error(err.response?.data?.error || 'Failed to update user')
      return rejectWithValue(err.response?.data?.error || 'Failed to update user')
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload.data
        state.currentPage = action.payload.page
        state.totalPages = action.payload.total_pages
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        toast.error(action.payload as string)
      })
      .addCase(updateUser.pending, (state) => {
        // state.loading = true
        state.error = null
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false
        const updatedUser = action.payload
        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? {...updatedUser, avatar: user.avatar} : user
        )
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        toast.error(action.payload as string)
      })
  }
})

export default userSlice.reducer 
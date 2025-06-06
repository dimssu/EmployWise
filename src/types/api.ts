export interface ApiError {
  error: string
}

export interface PaginatedResponse<T> {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: T[]
} 
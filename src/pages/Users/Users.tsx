import React, { useState } from 'react'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchUsers } from '../../redux/slices/userSlice'
import { Button } from '../../Common/Components/Button/Button'
import styles from './Users.module.scss'
import { useSearchParams } from 'react-router-dom'
import UserCard from './UserCard/UserCard'

const Users: React.FC = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const { users, currentPage, totalPages, loading } = useAppSelector((state) => state.user)
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(fetchUsers(page))
  }, [page])

  const handlePageChange = (page: number) => {
    setPage(page)
    setSearchParams({ page: page.toString() })
  }

  return (
    <div className={styles.usersContainer}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Users</h1>
      </div>

      {loading ? <div className={styles.loading}>Loading...</div> 
      : <div className={styles.usersGrid}>
        <div className={styles.userGrid}>
          {users.map((user) => (
            <UserCard
              key={user.id}
              first_name={user.first_name}
              last_name={user.last_name}
              email={user.email}
              avatar={user.avatar}
            />
          ))}
        </div>
      </div>}

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            variant={page === currentPage ? 'primary' : 'secondary'}
            size="small"
          >
            {page}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Users 
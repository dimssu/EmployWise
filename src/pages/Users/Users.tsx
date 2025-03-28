import React, { useState } from 'react'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchUsers } from '../../redux/slices/userSlice'
import { Button } from '../../Common/Components/Button/Button'
import styles from './Users.module.scss'
import { useSearchParams } from 'react-router-dom'
import UserCard from './UserCard/UserCard'
import { SideDrawer } from '../../Common/Components/SideDrawer/SideDrawer'
import { userService } from '../../services/userService'

const Users: React.FC = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const { users, currentPage, totalPages, loading } = useAppSelector((state) => state.user)
  const [page, setPage] = useState(1)
  const [selectedUser, setSelectedUser] = useState<null | typeof users[0]>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
    email: ''
  })

  useEffect(() => {
    dispatch(fetchUsers(page))
  }, [page])

  useEffect(() => {
    if (selectedUser) {
      setEditForm({
        first_name: selectedUser.first_name,
        last_name: selectedUser.last_name,
        email: selectedUser.email
      })
    }
  }, [selectedUser])

  const handlePageChange = (page: number) => {
    setPage(page)
    setSearchParams({ page: page.toString() })
  }

  const handleEditSubmit = async () => {
    if (!selectedUser) return
    try {
      await userService.updateUser(selectedUser.id, editForm)
      setIsEditing(false)
      dispatch(fetchUsers(page)) // Refresh the users list
    } catch (error) {
      console.error('Failed to update user:', error)
    }
  }

  return (
    <div className={styles.usersContainer}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Manage Users</h1>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : users ? (
        <div className={styles.usersGrid}>
          <div className={styles.userGrid}>
            {users.map((user) => (
              <UserCard
                key={user.id}
                first_name={user.first_name}
                last_name={user.last_name}
                email={user.email}
                avatar={user.avatar}
                onClick={() => setSelectedUser(user)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.loading}>No Users</div>
      )}

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

      <SideDrawer
        isOpen={!!selectedUser}
        onClose={() => {
          setSelectedUser(null)
          setIsEditing(false)
        }}
        header={
          selectedUser && (
            <div className={styles.drawerHeader}>
              {isEditing ? 'Edit User' : 'User Details'}
            </div>
          )
        }
        footer={
          <div className={styles.drawerFooter}>
            {isEditing ? <Button 
              variant="secondary" 
              size="large" 
              onClick={() => {
                setIsEditing(false)
                setEditForm({
                  first_name: selectedUser?.first_name || '',
                  last_name: selectedUser?.last_name || '',
                  email: selectedUser?.email || ''
                })
              }}
            >
              Cancel
            </Button> : <Button 
              variant="secondary" 
              size="large" 
              onClick={() => {
                setIsEditing(false)
                setSelectedUser(null)
              }}
            >
              Close
            </Button>}
            {isEditing ? (
              <Button variant="primary" size="large" onClick={handleEditSubmit}>
                Save
              </Button>
            ) : (
              <Button variant="primary" size="large" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            )}
          </div>
        }
      >
        {selectedUser && (
          <div className={styles.userDetails}>
            <img src={selectedUser.avatar} alt={`${selectedUser.first_name}'s avatar`} />
            {isEditing ? (
              <div className={styles.editForm}>
                <input
                  type="text"
                  value={editForm.first_name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, first_name: e.target.value }))}
                />
                <input
                  type="text"
                  value={editForm.last_name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, last_name: e.target.value }))}
                />
                <input
                  type="text"
                  value={editForm.email}
                  onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            ) : (
              <>
                <h3>{selectedUser.first_name} {selectedUser.last_name}</h3>
                <p>{selectedUser.email}</p>
              </>
            )}
          </div>
        )}
      </SideDrawer>
    </div>
  )
}

export default Users 
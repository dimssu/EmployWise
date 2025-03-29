import React, { useState } from 'react'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchUsers, updateUser, deleteUser } from '../../redux/slices/userSlice'
import { Button } from '../../Common/Components/Button/Button'
import styles from './Users.module.scss'
import { useSearchParams } from 'react-router-dom'
import UserCard from './UserCard/UserCard'
import { SideDrawer } from '../../Common/Components/SideDrawer/SideDrawer'
import { UserForm } from './UserForm/UserForm'

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
    
    await dispatch(updateUser({ 
      id: selectedUser.id, 
      userData: editForm 
    })).unwrap()
    
    setIsEditing(false)
  }

  const handleFormChange = (field: string, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }))
    setSelectedUser(prev => prev ? { ...prev, [field]: value } : null)
  }

  const handleDeleteUser = async () => {
    if (!selectedUser) return
    
    await dispatch(deleteUser(selectedUser.id)).unwrap()
    searchParams.delete('id')
    setSearchParams(searchParams)
    setSelectedUser(null)
    setIsEditing(false)
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
                onClick={() => {
                  searchParams.set('id', user.id.toString())
                  setSearchParams(searchParams)
                  setSelectedUser(user)
                }}
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
          searchParams.delete('id')
          setSearchParams(searchParams)
          setSelectedUser(null)
          setIsEditing(false)
        }}
        header={
          selectedUser && (
            <div className={styles.drawerHeader}>
              <span>{isEditing ? 'Edit User' : 'User Details'}</span>
              <Button
                variant="danger"
                size="small"
                onClick={handleDeleteUser}
              >
                Delete
              </Button>
            </div>
          )
        }
        footer={(handleClose) => (
          <div className={styles.drawerFooter}>
            {isEditing ? (
              <>
                <Button 
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
                </Button>
                <Button variant="primary" size="large" onClick={handleEditSubmit}>
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="secondary" 
                  size="large" 
                  onClick={handleClose}
                >
                  Close
                </Button>
                <Button variant="primary" size="large" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              </>
            )}
          </div>
        )}
      >
        {selectedUser && (
          <UserForm
            isEditing={isEditing}
            selectedUser={selectedUser}
            editForm={editForm}
            onEditFormChange={handleFormChange}
          />
        )}
      </SideDrawer>
    </div>
  )
}

export default Users 
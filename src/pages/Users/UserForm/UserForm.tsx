import React from 'react';
import styles from '../Users.module.scss';

interface UserFormProps {
  isEditing: boolean;
  selectedUser: {
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
  };
  editForm: {
    first_name: string;
    last_name: string;
    email: string;
  };
  onEditFormChange: (field: string, value: string) => void;
}

export const UserForm: React.FC<UserFormProps> = ({
  isEditing,
  selectedUser,
  editForm,
  onEditFormChange,
}) => {
  return (
    <div className={styles.userDetails}>
      <img src={selectedUser.avatar} alt={`${selectedUser.first_name}'s avatar`} />
      {isEditing ? (
        <div className={styles.editForm}>
          <input
            type="text"
            value={editForm.first_name}
            onChange={(e) => onEditFormChange('first_name', e.target.value)}
          />
          <input
            type="text"
            value={editForm.last_name}
            onChange={(e) => onEditFormChange('last_name', e.target.value)}
          />
          <input
            type="text"
            value={editForm.email}
            onChange={(e) => onEditFormChange('email', e.target.value)}
          />
        </div>
      ) : (
        <>
          <h3>{selectedUser.first_name} {selectedUser.last_name}</h3>
          <p>{selectedUser.email}</p>
        </>
      )}
    </div>
  );
}; 
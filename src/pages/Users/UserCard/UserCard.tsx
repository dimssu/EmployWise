import React from 'react';
import styles from './UserCard.module.scss';

interface UserCardProps {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  onClick?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ first_name, last_name, email, avatar, onClick }) => {
  return (
    <div className={styles.userCard} onClick={onClick}>
      <img src={avatar} alt={`${first_name} ${last_name}`} />
      <h3>{`${first_name} ${last_name}`}</h3>
      <p>{email}</p>
    </div>
  );
};

export default UserCard;

import React, { useState, useRef, useEffect } from 'react';
import styles from './ProfileButton.module.scss';
import { logout } from '../../../../redux/slices/authSlice';
import { useAppDispatch } from '../../../../redux/hooks';

const ProfileButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch()
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout())
  };

  return (
    <div className={styles.profileButton} ref={dropdownRef}>
      <button 
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img 
          src={"https://gravatar.com/avatar/f8658da2c3e8d5e7f2ce4f7ffb2f2c9e?s=800&d=robohash&r=x"}
          alt="Profile" 
          className={styles.avatar}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <ul>
            <li>
            <button onClick={handleLogout}>My Profile</button>
            </li>
            <li>
            <button onClick={handleLogout}>My Resume</button>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;

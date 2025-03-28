import React, { useEffect, useState } from 'react';
import styles from './TopBar.module.scss';
import { Link, useLocation } from 'react-router-dom';
import ProfileButton from './ProfileButton/ProfileBUtton';

interface TopBarProps {
  title?: string;
}

const TopBar: React.FC<TopBarProps> = ({ title = 'EmployWise' }) => {

    const location = useLocation()
    console.log(location.pathname)
    const [activeLink, setActiveLink] = useState('')

    useEffect(() => {
        switch (true) {
            case location.pathname.includes('/users'):
                setActiveLink('users');
                break;
            default:
                setActiveLink('');
        }
    }, [location.pathname]);

  return (
    <header className={styles.topbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">{title}</Link>
        </div>
        <nav className={styles.navigation}>
          <ul>
            <li>
              <Link 
                to="/users" 
                className={activeLink === 'users' ? styles.active : ''}
              >
                Users
              </Link>
            </li>
          </ul>
        </nav>
          <ProfileButton />
      </div>
    </header>
  );
};

export default TopBar;

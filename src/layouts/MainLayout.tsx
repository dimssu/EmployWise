import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'
import TopBar from '../Common/Components/TopBar/Topbar'

export const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <TopBar />
        <Outlet />
      </main>
    </div>
  )
} 
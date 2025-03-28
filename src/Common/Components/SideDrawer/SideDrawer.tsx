import React, { ReactNode } from 'react';
import styles from './SideDrawer.module.scss';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  width?: string;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  header,
  footer,
  children,
  width = '50%'
}) => {
  return (
    <>
      {isOpen && (
        <div className={styles.overlay} onClick={onClose}>
          <div 
            className={styles.drawer} 
            onClick={(e) => e.stopPropagation()}
            style={{ width }}
          >
            <button className={styles.closeButton} onClick={onClose}>
              ×
            </button>
            {header && (
              <div className={styles.header}>
                {header}
              </div>
            )}
            
            <div className={styles.content}>
              {children}
            </div>

            {footer && (
              <div className={styles.footer}>
                {footer}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

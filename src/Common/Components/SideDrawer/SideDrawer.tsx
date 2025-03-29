import React, { ReactNode, useState, useEffect } from 'react';
import styles from './SideDrawer.module.scss';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  header?: ReactNode;
  footer?: ReactNode | ((handleClose: () => void) => ReactNode);
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
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    }
    setIsVisible(false);
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setIsVisible(false);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  return (
    <>
      {(isOpen || isClosing) && (
        <div className={`${styles.overlay} ${isClosing ? styles.fadeOut : ''}`} onClick={handleClose}>
          <div 
            className={`${styles.drawer} ${isVisible ? styles.slideIn : ''}`}
            onClick={(e) => e.stopPropagation()}
            style={{ width }}
          >
            <button className={styles.closeButton} onClick={handleClose}>
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
                {typeof footer === 'function' ? footer(handleClose) : footer}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

import { PropsWithChildren } from 'react';
import styles from '@/styles/components/drawer.module.scss';

type DirectionType = 'lr' | 'rl';

type Props = {
  isShowing: boolean;
  onClose: () => void;
  direction?: DirectionType;
  width?: string | number;
};

export default function Drawer({
  children,
  isShowing,
  onClose,
  direction = 'lr',
}: PropsWithChildren<Props>) {
  return (
    <>
      <div className={`${styles.container}`}>
        <input
          type='checkbox'
          className={`${styles.drawerActivator}`}
          checked={isShowing}
        />
        <div className={`${styles.background}`} onClick={onClose}></div>
        <nav
          className={`${styles.drawer} ${direction === 'lr' ? styles.lr : ''}`}
        >
          {children}
        </nav>
      </div>
    </>
  );
}

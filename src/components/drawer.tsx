import { PropsWithChildren } from 'react';
import styles from '@/styles/components/drawer.module.scss';

type DirectionType = 'lr' | 'rl';

type Props = {
  isShowing?: boolean;
  direction?: DirectionType;
  width?: string | number;
};

export default function Drawer({
  children,
  isShowing = false,
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
        <div className={`${styles.background}`}></div>
        <div className={`${styles.close}`}></div>
        <nav
          className={`${styles.drawer} ${direction === 'lr' ? styles.lr : ''}`}
        >
          {children}
        </nav>
      </div>
    </>
  );
}

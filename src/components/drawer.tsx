import { PropsWithChildren } from 'react';
import styles from '@/styles/components/drawer.module.scss';

type DirectionType = 'lr' | 'rl';

type Props = {
  direction?: DirectionType;
  width?: string | number;
};

export default function Drawer({
  children,
  direction = 'lr',
}: PropsWithChildren<Props>) {
  return (
    <>
      <div className={`${styles.container}`}>
        <input type='checkbox' className={`${styles.drawerActivator}`} />
        <nav
          className={`${styles.drawer} ${direction === 'lr' ? styles.lr : ''}`}
        >
          {children}
        </nav>
      </div>
    </>
  );
}

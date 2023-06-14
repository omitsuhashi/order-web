import { PropsWithChildren } from 'react';
import styles from '../styles/components/drawer.module.scss';

type DirectionType = 'lr' | 'rl' | 'tb' | 'bt';

type Props = {
  direction: DirectionType;
  width?: string | number;
  height?: string | number;
};

export default function Drawer({
  children,
  direction = 'lr',
}: PropsWithChildren<Props>) {
  return (
    <>
      <div
        className={`${styles.drawer} ${direction === 'lr' ? styles.lr : ''}`}
      >
        {children}
      </div>
    </>
  );
}

import { PropsWithChildren } from 'react';
import styles from '@/styles/components/drawer.module.scss';
import { COMPONENT_TEST_ID } from '@/constants/testid';

type DirectionType = 'lr' | 'rl';

type Props = {
  readonly isShowing: boolean;
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
      <div
        className={`${styles.container}`}
        data-testid={COMPONENT_TEST_ID.DRAWER}
      >
        <input
          type='checkbox'
          className={`${styles.drawerActivator}`}
          checked={isShowing}
          onChange={() => {}}
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

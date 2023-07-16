import { PropsWithoutRef } from 'react';
import Image from 'next/image';
import { MenuItemType } from '@/types/store/order';
import { ORDER_TEST_ID } from '@/constants/testid/stores';
import styles from '@/styles/pages/store.module.scss';
import { useCartItem } from '@/hooks/store/order/cart';

type Props = {
  item: MenuItemType;
};

export default function MenuItem({ item }: PropsWithoutRef<Props>) {
  const cartItem = useCartItem(item);
  return (
    <>
      <div
        className={`box ${styles.itemContainer}`}
        data-testid={ORDER_TEST_ID.MENU_ITEM_COMPONENT}
      >
        {cartItem !== undefined && (
          <span
            className={`${styles.badge} has-background-success has-text-white`}
          >
            {cartItem.quantity}
          </span>
        )}
        <figure>
          <Image
            src='https://bulma.io/images/placeholders/128x128.png'
            alt='not found'
            width={140}
            height={140}
          />
        </figure>
        <div>
          <p className='title is-6'>{item.name}</p>
          <p className='subtitle is-6'>{item.price}</p>
        </div>
      </div>
    </>
  );
}

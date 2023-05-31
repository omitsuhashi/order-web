import { PropsWithoutRef } from 'react';
import Image from 'next/image';
import { MenuItemType } from '@/stores/order/types';
import { ORDER_TEST_ID } from '@/constants/testid/stores';

type Props = {
  item: MenuItemType;
};

export default function MenuItemComponent({ item }: PropsWithoutRef<Props>) {
  return (
    <>
      <div data-testid={ORDER_TEST_ID.MENU_ITEM_COMPONENT}>
        <div>
          <figure>
            <Image
              src='https://bulma.io/images/placeholders/128x128.png'
              alt='not found'
              width={140}
              height={140}
            />
          </figure>
        </div>
        <div>
          <p className='title is-6'>{item.name}</p>
          <p className='subtitle is-6'>{item.price}</p>
        </div>
      </div>
    </>
  );
}

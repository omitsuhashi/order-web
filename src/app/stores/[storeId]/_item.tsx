import { PropsWithoutRef } from 'react';
import Image from 'next/image';
import { MenuItemType } from '@/stores/order/types';

type Props = {
  item: MenuItemType;
};

export default function ItemComponent({ item }: PropsWithoutRef<Props>) {
  return (
    <>
      <div data-testid={'item'}>
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

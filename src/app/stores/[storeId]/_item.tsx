import { FetchMenuItemDaoModel } from '@/dao/menu';
import { PropsWithoutRef } from 'react';
import Image from 'next/image';

type Props = {
  item: FetchMenuItemDaoModel;
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

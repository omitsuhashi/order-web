import { PropsWithoutRef } from 'react';
import Image from 'next/image';
import { MenuItemType } from '@/types/order';
import { ORDER_TEST_ID } from '@/constants/testid/stores';

type Props = {
  item: MenuItemType;
};

type Args = {
  props: Props;
};

export default function MenuItemComponent({ props }: PropsWithoutRef<Args>) {
  return (
    <>
      <div className={'box'} data-testid={ORDER_TEST_ID.MENU_ITEM_COMPONENT}>
        <figure>
          <Image
            src='https://bulma.io/images/placeholders/128x128.png'
            alt='not found'
            width={140}
            height={140}
          />
        </figure>
        <div>
          <p className='title is-6'>{props.item.name}</p>
          <p className='subtitle is-6'>{props.item.price}</p>
        </div>
      </div>
    </>
  );
}

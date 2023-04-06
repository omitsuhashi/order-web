import { FetchItemDaoModel } from '@/dao/order';
import { useState } from 'react';

type Props = {
  item: FetchItemDaoModel;
};

export default function ItemComponent({ item }: Props) {
  const [quantity, setQuantity] = useState(1);
  return (
    <>
      <div className='media'>
        <div className='media-left'>fig</div>
        <div className='media-content'>
          <p className='title is-4'>{item.name}</p>
          <p className='subtitle is-6'>desc</p>
        </div>
        <div className='media-right'>
          <input className={'input'} type='text' value={quantity} />
        </div>
      </div>
    </>
  );
}

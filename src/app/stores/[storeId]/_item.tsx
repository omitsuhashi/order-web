import { FetchItemDaoModel } from '@/dao/order';
import { PropsWithoutRef, useState } from 'react';

type Props = {
  item: FetchItemDaoModel;
};

export default function ItemComponent({ item }: PropsWithoutRef<Props>) {
  const [quantity, setQuantity] = useState(1);
  const onChangeQuantity = (value: HTMLInputElement) =>
    setQuantity(value.valueAsNumber);
  return (
    <>
      <div className='media' data-testid={'item'}>
        <div className='media-left'>fig</div>
        <div className='media-content'>
          <p className='title is-4'>{item.name}</p>
          <p className='subtitle is-6'>desc</p>
        </div>
        <div className='media-right'>
          <input
            className={'input'}
            type='text'
            value={quantity}
            onChange={onChangeQuantity}
          />
          <button className='button is-primary'>カートに入れる</button>
        </div>
      </div>
    </>
  );
}

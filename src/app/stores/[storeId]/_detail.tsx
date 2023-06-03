import styles from '@/app/stores/[storeId]/styles.module.scss';
import { ORDER_TEST_ID } from '@/constants/testid/stores';
import { CartItemType, MenuItemType } from '@/types/order';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CartSelector, CartState } from '@/stores/order/cart';

type Props = {
  menuItem: MenuItemType;
};

type Args = {
  props: Props;
  onClickOrder: () => void;
};

export default function MenuItemDetailComponent({ props, onClickOrder }: Args) {
  const [, setCart] = useRecoilState(CartState);
  const cartItem = useRecoilValue(CartSelector(props.menuItem.id));
  const [quantity, setQuantity] = useState(cartItem?.quantity ?? 1);
  const isEdit = cartItem !== undefined;

  const onClickUpdateCart = () => {
    const item: CartItemType = {
      menuId: props.menuItem.id,
      quantity,
    };
    if (isEdit) {
      setCart((currVal) => {
        const idx = currVal.indexOf(cartItem);
        currVal[idx] = item;
        return currVal;
      });
    } else {
      setCart((currVal) => currVal.concat(item));
    }
    onClickOrder();
  };

  return (
    <>
      <p>{props.menuItem.name}</p>
      <p>{props.menuItem.description}</p>
      <div className={`${styles.inputNumber} is-flex is-align-items-center`}>
        <span
          className={'icon'}
          onClick={() => setQuantity(quantity - 1)}
          aria-disabled={quantity < 1}
          data-testid={ORDER_TEST_ID.SUB_QUANTITY_BUTTON}
        >
          <i className='fas fa-lg fa-regular fa-circle-minus'></i>
        </span>
        <input
          value={quantity}
          onChange={(ev) => setQuantity(Number(ev.target.value))}
          className='input mx-1'
          type='number'
          placeholder='個数'
          data-testid={ORDER_TEST_ID.QUANTITY_INPUT}
        />
        <span
          className={'icon'}
          onClick={() => setQuantity(quantity + 1)}
          data-testid={ORDER_TEST_ID.ADD_QUANTITY_BUTTON}
        >
          <i className='fas fa-lg fa-regular fa-circle-plus'></i>
        </span>
      </div>
      <button
        className='button is-outlined'
        onClick={onClickUpdateCart}
        data-testid={ORDER_TEST_ID.UPDATE_CART_BUTTON}
      >
        {isEdit ? 'カートを更新' : 'カートに入れる'}
      </button>
    </>
  );
}

import { ORDER_TEST_ID } from '@/constants/testid/stores';
import { CartItemType, MenuItemType } from '@/types/order';
import { ChangeEvent, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CartSelector, CartState } from '@/stores/order/cart';
import Select, { OptionType } from '@/components/atoms/select';

type Props = {
  menuItem: MenuItemType;
  onClickOrder: () => void;
};

export default function MenuItemDetail({ menuItem, onClickOrder }: Props) {
  const [, setCart] = useRecoilState(CartState);
  const cartItem = useRecoilValue(CartSelector(menuItem.id));
  const [quantity, setQuantity] = useState(cartItem?.quantity ?? 1);
  const isEdit = cartItem !== undefined;

  const onClickUpdateCart = () => {
    const item: CartItemType = {
      menuId: menuItem.id,
      quantity,
    };
    if (isEdit) {
      setCart((currVal) => {
        const idx = currVal.indexOf(cartItem);
        const result = [...currVal];
        result[idx] = item;
        return result;
      });
    } else {
      setCart((currVal) => currVal.concat(item));
    }
    onClickOrder();
  };

  const onSelectQuantity = (ev: ChangeEvent<HTMLSelectElement>) => {
    const quantity = Number(ev.target.value);
    setQuantity(quantity);
  };

  const options: Array<OptionType<number>> = new Array(10)
    .fill(0)
    .map((value, index) => {
      const idx = index + 1;
      return {
        label: idx.toString(),
        value: idx,
      };
    });

  return (
    <>
      <p>{menuItem.name}</p>
      <p>{menuItem.description}</p>
      <Select<number>
        textLabel='個数'
        options={options}
        onChange={onSelectQuantity}
        defaultValue={quantity}
      />
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

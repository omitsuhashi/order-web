import { ORDER_TEST_ID } from '@/constants/testid/stores';
import { MenuItemType } from '@/types/store/order';
import { ChangeEvent } from 'react';
import Select, { OptionType } from '@/components/atoms/select';
import { useCartItem } from '@/hooks/store/order/cart';

type Props = {
  menuItem: MenuItemType;
  onClickOrder: () => void;
};

export default function MenuItemDetail({ menuItem, onClickOrder }: Props) {
  const [cartItem] = useCartItem(menuItem);
  const isEdit = cartItem !== undefined;

  const onClickUpdateCart = () => {
    onClickOrder();
  };

  const onSelectQuantity = (ev: ChangeEvent<HTMLSelectElement>) => {
    const quantity = Number(ev.target.value);
    console.info(quantity);
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
        defaultValue={cartItem?.quantity ?? 1}
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

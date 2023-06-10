import { ORDER_TEST_ID } from '@/constants/testid/stores';
import { MenuItemType } from '@/types/order';
import axiosInstance from '@/libs/axios';
import { STORE_API } from '@/constants/api';
import axios from 'axios';
import { StoreArgs } from '@/app/stores/[storeId]/page';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { CartState } from '@/stores/order/cart';

type Props = {
  menuItems: Array<MenuItemType>;
};

type Args = {
  props: Props;
} & StoreArgs;

export default function CartComponent({ params }: Args) {
  const cart = useRecoilValue(CartState);
  // const items = cart.map(
  //   (c) => props.menuItems.find((v) => v.id === c.menuId)?.name,
  // );
  const resetCart = useResetRecoilState(CartState);

  const onClickOrder = async () => {
    try {
      await axiosInstance.post(STORE_API.order(params.storeId), cart);
      resetCart();
    } catch (e) {
      if (axios.isAxiosError(e)) {
      } else {
        throw Error('unexpected error');
      }
    }
  };

  return (
    <button
      className='button is-outlined'
      onClick={onClickOrder}
      data-testid={ORDER_TEST_ID.ORDER_BUTTON}
    >
      オーダー
    </button>
  );
}

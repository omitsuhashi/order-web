import { ORDER_TEST_ID } from '@/constants/testid/stores';
import { MenuItemType } from '@/types/store/order';
import axiosInstance from '@/libs/axios';
import { STORE_API } from '@/constants/api';
import axios from 'axios';
import { StoreArgs } from '@/app/stores/[storeId]/page';
import { useCart } from '@/hooks/store/order/cart';

type Props = {
  menuItems: Array<MenuItemType>;
};

type Args = {
  props: Props;
} & StoreArgs;

export default function Cart({ params }: Args) {
  const [cart, resetCart] = useCart();

  const onClickOrder = async () => {
    try {
      await axiosInstance.post(STORE_API.order(params.storeId), cart);
      await resetCart();
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

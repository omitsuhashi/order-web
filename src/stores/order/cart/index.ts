import { atom } from 'recoil';
import OrderStateKey from '@/stores/order/keys';
import { CartItemType } from '@/stores/order/types';

export const CartState = atom<Array<CartItemType>>({
  key: OrderStateKey.CART_STATE,
  default: [],
});

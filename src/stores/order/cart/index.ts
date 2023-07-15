import { atom, selectorFamily } from 'recoil';
import OrderStateKey from '@/stores/order/keys';
import { CartItemType } from '@/types/store/order';

export const CartState = atom<Array<CartItemType>>({
  key: OrderStateKey.CART_STATE,
  default: [],
});

export const CartSelector = selectorFamily<CartItemType | undefined, number>({
  key: OrderStateKey.CART_SELECTOR,
  get:
    (param) =>
    ({ get }) => {
      const cart = get(CartState);
      return cart.find((v) => v.menuId === param);
    },
});

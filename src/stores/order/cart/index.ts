import { atom, selector } from 'recoil';
import OrderStateKey from '@/stores/order/keys';
import { CartItemType, MenuItemType } from '@/stores/order/types';
import { MenuItemState } from '@/stores/order/menu';

export const CartState = atom<Array<CartItemType>>({
  key: OrderStateKey.CART_STATE,
  default: [],
});

export const CartItemsSelector = selector<Array<MenuItemType | null>>({
  key: OrderStateKey.CART_SELECTOR,
  get: (opts) => {
    const cartState = opts.get(CartState);
    return cartState.map((s) => {
      return opts.get(MenuItemState(s.menuId));
    });
  },
});

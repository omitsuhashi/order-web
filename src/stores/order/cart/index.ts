import { atom, selector } from 'recoil';
import OrderStateKey from '@/stores/order/keys';
import { CartType, MenuItemType } from '@/stores/order/types';
import { MenuItemState } from '@/stores/order/menu';

const CartState = atom<Array<CartType>>({
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

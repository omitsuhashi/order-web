import { atomFamily } from 'recoil';
import OrderStateKey from '@/store/order/keys';
import { MenuItemType } from '@/store/order/types';

export const MenuItemState = atomFamily<MenuItemType | null, number>({
  key: OrderStateKey.MENU_STATE,
  default: null,
});

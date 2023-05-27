import { atomFamily } from 'recoil';
import OrderStateKey from '@/stores/order/keys';
import { MenuItemType } from '@/stores/order/types';

export const MenuItemState = atomFamily<MenuItemType | null, number>({
  key: OrderStateKey.MENU_STATE,
  default: null,
});

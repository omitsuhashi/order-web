import { atom, selector } from 'recoil';
import MenuModel from '@/models/menu';

const MENU_STATE_KEY = 'MENU_STATE';
const MENU_ITEMS_STATE_KEY = 'MENU_ITEM_STATE_KEY';

const menuState = atom<Array<MenuModel>>({
  key: MENU_STATE_KEY,
  default: [],
});

export const menuItemsState = selector({
  key: MENU_ITEMS_STATE_KEY,
  get: ({ get }) => get(menuState),
});

export default menuState;

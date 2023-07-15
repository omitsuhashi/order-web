import { ID } from '@/types';

export type CartItemType = {
  menuId: number;
  quantity: number;
};

export type MenuItemType = {
  id: number;
  name: string;
  price: number;
  description?: string;
};

export type MenuType = {
  genreId: ID;
  items: Array<MenuItemType>;
};

export type CategoryItemType = {
  id: ID;
  label: string;
};

export type CategoryType = {
  genre: string;
  children: Array<CategoryItemType>;
};

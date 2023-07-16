import { ID } from '@/types';

export type CartItemType = Map<ID, number>;

export type MenuItemType = {
  id: ID;
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
  label: string;
  children: Array<CategoryItemType>;
};

export type StoreInfoType = {
  id: ID;
  name: string;
  categories: Array<CategoryType>;
  defaultCategoryId: ID;
};

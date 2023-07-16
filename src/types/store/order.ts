import { ID } from '@/types';

export type CartItemInfoType = { quantity: number };

export type CartItemType = Map<ID, CartItemInfoType>;

export type MenuItemType = {
  id: ID;
  name: string;
  price: number;
  description?: string;
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

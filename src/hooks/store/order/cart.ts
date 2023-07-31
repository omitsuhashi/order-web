import { CartItemType, CartType } from '@/types/store/order';
import { Reducer, useState } from 'react';
import { ID } from '@/types';

// if quantity: 0 then remove from cart
type UpdateCartItemFunc = (
  item: CartItemType,
  quantity: number,
) => Promise<void>;

type SetCartActionType = {
  type: 'SET';
  payload: { id: ID; item: CartItemType };
};

type ResetCartActionType = {
  type: 'RESET';
};

type DeleteCartActionType = {
  type: 'DELETE';
  payload: { id: ID };
};

type CartActionType =
  | SetCartActionType
  | ResetCartActionType
  | DeleteCartActionType;

export const cartReducer: Reducer<CartType, CartActionType> = (
  prevState,
  action,
) => {
  switch (action.type) {
    case 'RESET':
      return new Map();
    case 'SET':
      prevState.set(action.payload.id, action.payload.item);
      return new Map(prevState);
    case 'DELETE':
      prevState.delete(action.payload.id);
      return new Map(prevState);
    default:
      throw SyntaxError(`undefined action: ${action}`);
  }
};

// fetch from cart repository
export function useCartItem() {
  const [cartItem] = useState<CartItemType>();
  const setCartItem: UpdateCartItemFunc = (quantity) => {
    quantity;
    return new Promise((resolve) => resolve());
  };
  return [cartItem, setCartItem] as const;
}

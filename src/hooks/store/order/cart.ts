import { CartItemType, CartType, MenuItemType } from '@/types/store/order';

// if quantity: 0 then remove from cart
type UpdateCartItemFunctionType = (quantity: number) => Promise<void>;
type ResetCartFunctionType = () => Promise<void>;

// fetch from cart repository
export function useCartItem(
  item: MenuItemType,
): [CartItemType | undefined, UpdateCartItemFunctionType] {
  item.id;
  const setCartItem: UpdateCartItemFunctionType = (quantity) => {
    quantity;
    return new Promise((resolve) => resolve());
  };
  return [undefined, setCartItem];
}

export function useCart(): [CartType, ResetCartFunctionType] {
  const resetCart: ResetCartFunctionType = () =>
    new Promise((resolve) => resolve());
  return [new Map(), resetCart];
}

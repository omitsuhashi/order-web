import {
  CartItemInfoType,
  CartItemType,
  MenuItemType,
} from '@/types/store/order';

export function useCartItem(item: MenuItemType): CartItemInfoType | undefined {
  console.info(item);
  return undefined;
}

type ResetCartFunctionType = () => Promise<void>;

export function useCart(): [CartItemType, ResetCartFunctionType] {
  const resetCart: ResetCartFunctionType = () =>
    new Promise((resolve) => resolve());
  return [new Map(), resetCart];
}

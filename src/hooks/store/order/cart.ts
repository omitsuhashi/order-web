import { CartItemType } from '@/types/store/order';

export function useCartItem(): CartItemType {
  return new Map();
}

type ResetCartFunctionType = () => Promise<void>;

export function useCart(): [CartItemType, ResetCartFunctionType] {
  const resetCart: ResetCartFunctionType = () =>
    new Promise((resolve) => resolve());
  return [new Map(), resetCart];
}

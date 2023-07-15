import { CartItemType } from '@/types/store/order';

export function useCartItem(): CartItemType | undefined {
  return undefined;
}

type ResetCartFunctionType = () => Promise<void>;

export function useCart(): [CartItemType, ResetCartFunctionType] {
  const resetCart = () => new Promise<void>((resolve) => resolve());
  return [new Map(), resetCart];
}

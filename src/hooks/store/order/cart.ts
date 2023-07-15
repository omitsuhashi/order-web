import { CartItemType } from '@/types/store/order';

export function useCartItem(): CartItemType | undefined {
  return undefined;
}

type ResetCartFunctionType = () => Promise<void>;

export function useCart(): [Array<CartItemType>, ResetCartFunctionType] {
  return [[], () => new Promise((resolve) => resolve())];
}

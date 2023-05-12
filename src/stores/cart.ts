import { atom } from 'recoil';

type CartType = Map<number, number>;

const CART_STATE_KEY = 'CART_STATE';

const cartState = atom<CartType>({
  key: CART_STATE_KEY,
  default: new Map(),
});

export default cartState;

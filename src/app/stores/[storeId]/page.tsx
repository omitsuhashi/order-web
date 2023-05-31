'use client';

import useSWR from 'swr';
import { STORE_API } from '@/constants/api';
import MenuItemComponent from '@/app/stores/[storeId]/_item';
import styles from '@/app/stores/[storeId]/styles.module.scss';
import Modal from '@/components/modal';
import { useState } from 'react';
import axiosInstance from '@/libs/axios';
import axios from 'axios';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { CartState } from '@/stores/order/cart';
import { CartItemType, MenuItemType } from '@/stores/order/types';
import Loading from '@/components/loading';
import { ORDER_TEST_ID } from '@/constants/testid/stores';

type Params = {
  storeId: string | number;
};

type SearchParams = {
  sid?: string;
};

type Args = {
  params: Params;
  searchParams: SearchParams;
};

export default function OrderIndex({ params }: Args) {
  const [quantity, setQuantity] = useState<number>(1);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [openCartModal, setOpenCartModal] = useState<boolean>(false);
  const [detailItem, setDetailItem] = useState<MenuItemType>();
  const [cart, setCart] = useRecoilState(CartState);
  const resetCart = useResetRecoilState(CartState);

  const { data, error } = useSWR<Array<MenuItemType>>(
    STORE_API.getAll(params.storeId),
  );
  if (error) return <p>Error</p>;
  if (!data) return <Loading />;

  const onClickOrder = async () => {
    // カートのアイテムを送る
    try {
      await axiosInstance.post(STORE_API.order(params.storeId), cart);
      setOpenCartModal(false);
      resetCart();
    } catch (e) {
      if (axios.isAxiosError(e)) {
      } else {
        throw Error('unexpected error');
      }
    }
  };

  const onCloseOrderDetailModal = () => {
    setDetailItem(undefined);
  };

  const onClickUpdateCart = () => {
    if (detailItem) {
      const item: CartItemType = {
        menuId: detailItem.id,
        quantity,
      };
      setCart((currVal) => [...currVal, item]);
      onCloseOrderDetailModal();
    }
  };

  const onClickItem = (item: MenuItemType) => {
    const cartItem = cart.find((v) => v.menuId === item.id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
      setIsEdit(true);
    } else {
      setQuantity(1);
      setIsEdit(false);
    }
    setDetailItem(item);
  };

  const items = data.map((item, idx) => {
    return (
      <div
        className={`column is-two-fifths-mobile is-one-quarter-tablet ${styles.item}`}
        key={idx}
        onClick={() => onClickItem(item)}
      >
        <MenuItemComponent item={item} />
      </div>
    );
  });

  return (
    <>
      <div className={`columns is-multiline is-centered is-mobile mt-2`}>
        {items}
      </div>

      <span
        className={`icon is-large has-background-link-light ${styles.cartIcon}`}
        onClick={() => setOpenCartModal(true)}
        data-testid={ORDER_TEST_ID.OPEN_CART_MODAL_BUTTON}
      >
        <i className='fas fa-lg fa-regular fa-cart-shopping has-text-link-dark'></i>
      </span>

      {/* 商品詳細モーダル */}
      <Modal
        isActive={detailItem !== undefined}
        onClose={onCloseOrderDetailModal}
        testId={ORDER_TEST_ID.MENU_ITEM_DETAIL_MODAL}
      >
        <p>{detailItem?.name}</p>
        <p>{detailItem?.description}</p>
        <div className={`${styles.inputNumber} is-flex is-align-items-center`}>
          <span
            className={'icon'}
            onClick={() => setQuantity(quantity - 1)}
            aria-disabled={quantity < 1}
            data-testid={ORDER_TEST_ID.SUB_QUANTITY_BUTTON}
          >
            <i className='fas fa-lg fa-regular fa-circle-minus'></i>
          </span>
          <input
            value={quantity}
            onChange={(ev) => setQuantity(Number(ev.target.value))}
            className='input mx-1'
            type='number'
            placeholder='個数'
            data-testid={ORDER_TEST_ID.QUANTITY_INPUT}
          />
          <span
            className={'icon'}
            onClick={() => setQuantity(quantity + 1)}
            data-testid={ORDER_TEST_ID.ADD_QUANTITY_BUTTON}
          >
            <i className='fas fa-lg fa-regular fa-circle-plus'></i>
          </span>
        </div>
        <button
          className='button is-outlined'
          onClick={onClickUpdateCart}
          data-testid={ORDER_TEST_ID.UPDATE_CART_BUTTON}
        >
          {isEdit ? 'カートを更新' : 'カートに入れる'}
        </button>
      </Modal>

      {/* カートモーダル */}
      <Modal
        isActive={openCartModal}
        onClose={() => setOpenCartModal(false)}
        testId={ORDER_TEST_ID.CART_MODAL}
      >
        {cart.map((c) => data.find((v) => v.id === c.menuId)?.name)}
        <button
          className='button is-outlined'
          onClick={onClickOrder}
          data-testid={ORDER_TEST_ID.ORDER_BUTTON}
        >
          オーダー
        </button>
      </Modal>
    </>
  );
}

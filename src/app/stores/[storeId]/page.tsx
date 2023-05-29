'use client';

import useSWR from 'swr';
import { STORE_API } from '@/constants/api';
import ItemComponent from '@/app/stores/[storeId]/_item';
import styles from '@/app/stores/[storeId]/styles.module.scss';
import Modal from '@/components/modal';
import { useState } from 'react';
import axiosInstance from '@/libs/axios';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { CartState } from '@/stores/order/cart';
import { MenuItemType } from '@/stores/order/types';

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
  const [isEdit] = useState<boolean>(false);
  const [openOrderModal, setOpenOrderModal] = useState<boolean>(false);
  const [detailItem, setDetailItem] = useState<MenuItemType>();
  const [cart] = useRecoilState(CartState);

  const onClickItem = (item: MenuItemType) => {
    setDetailItem(item);
  };

  const onClickOrder = async () => {
    // カートのアイテムを送る
    try {
      const payload = cart.map((v) => v.menuId);
      await axiosInstance.post(STORE_API.order(params.storeId), payload);
    } catch (e) {
      if (axios.isAxiosError(e)) {
      } else {
        throw Error('unknown error');
      }
    }
  };

  const onCloseOrderDetailModal = () => {};

  const onClickCart = () => {
    onCloseOrderDetailModal();
  };

  const { data, error } = useSWR<Array<MenuItemType>>(
    STORE_API.getAll(params.storeId),
  );
  if (error) return <p>Error</p>;
  if (!data) return <p>Loading</p>;

  const items = data.map((item, idx) => (
    <div
      className={`column is-two-fifths-mobile is-one-quarter-tablet ${styles.item}`}
      key={idx}
      onClick={() => onClickItem(item)}
    >
      <ItemComponent item={item} />
    </div>
  ));
  return (
    <>
      <div className={`columns is-multiline is-centered is-mobile mt-2`}>
        {items}
      </div>

      <span
        className={`icon is-large has-background-link-light ${styles.cartIcon}`}
        onClick={() => setOpenOrderModal(true)}
      >
        <i className='fas fa-lg fa-regular fa-cart-shopping has-text-link-dark'></i>
      </span>

      {/* 詳細オーダーモーダル */}
      <Modal
        isActive={detailItem !== undefined}
        onClose={onCloseOrderDetailModal}
        testId='order-detail-modal'
      >
        <p>{detailItem?.name}</p>
        <p>{detailItem?.description}</p>
        <div className={`${styles.inputNumber} is-flex is-align-items-center`}>
          <span
            className={'icon'}
            onClick={() => setQuantity(quantity - 1)}
            aria-disabled={quantity < 1}
          >
            <i className='fas fa-lg fa-regular fa-circle-minus'></i>
          </span>
          <input
            value={quantity}
            onChange={(ev) => setQuantity(Number(ev.target.value))}
            className='input mx-1'
            type='number'
            placeholder='個数'
          />
          <span className={'icon'} onClick={() => setQuantity(quantity + 1)}>
            <i className='fas fa-lg fa-regular fa-circle-plus'></i>
          </span>
        </div>
        <button className='button is-outlined' onClick={onClickCart}>
          {isEdit ? 'カートを更新' : 'カートに入れる'}
        </button>
      </Modal>
      {/* カートモーダル */}
      <Modal
        isActive={openOrderModal}
        onClose={() => setOpenOrderModal(false)}
        testId='cart-modal'
      >
        <button className='button is-outlined' onClick={onClickOrder}>
          オーダー
        </button>
      </Modal>
    </>
  );
}

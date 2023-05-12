'use client';

import useSWR from 'swr';
import { FetchMenuItemDaoModel } from '@/dao/menu';
import { STORE_API } from '@/constants/api';
import ItemComponent from '@/app/stores/[storeId]/_item';
import styles from '@/app/stores/[storeId]/styles.module.scss';
import Modal from '@/components/modal';
import { useState } from 'react';
import axiosInstance from '@/libs/axios';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import cartState from '@/stores/cart';

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
  const [item, setItem] = useState<FetchMenuItemDaoModel>();
  const [quantity, setQuantity] = useState<number>(1);
  const [cart, setCart] = useRecoilState(cartState);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [openOrderModal, setOpenOrderModal] = useState<boolean>(false);

  const onClickItem = (item: FetchMenuItemDaoModel) => {
    setItem(item);
    const _quantity = cart.get(item.id);
    const _isEdit = _quantity !== undefined;
    setIsEdit(_isEdit);
    setQuantity(_quantity ?? 1);
  };

  const onClickOrder = async () => {
    // カートのアイテムを送る
    try {
      const payload = Object.fromEntries(cart);
      await axiosInstance.post(STORE_API.order(params.storeId), payload);
    } catch (e) {
      if (axios.isAxiosError(e)) {
      } else {
        throw Error('unknown error');
      }
    }
  };

  const onCloseOrderDetailModal = () => {
    setItem(undefined);
  };

  const onClickCart = () => {
    if (item?.id !== undefined && quantity >= 0) {
      setCart((prevState) => prevState.set(item.id, quantity));
    } else {
      throw new ReferenceError('unselectable item');
    }
    onCloseOrderDetailModal();
  };

  const { data, error } = useSWR<Array<FetchMenuItemDaoModel>>(
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
        isActive={item !== undefined}
        onClose={onCloseOrderDetailModal}
        testId='order-detail-modal'
      >
        {item ? <p>{item.name}</p> : <p>unexpect error</p>}
        <p>{item?.description}</p>
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

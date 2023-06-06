'use client';

import useSWR from 'swr';
import { STORE_API } from '@/constants/api';
import MenuItemComponent from '@/app/stores/[storeId]/_item';
import styles from '@/app/stores/[storeId]/styles.module.scss';
import Modal from '@/components/modal';
import { useState } from 'react';
import { MenuItemType } from '@/types/order';
import Loading from '@/components/loading';
import { ORDER_TEST_ID } from '@/constants/testid/stores';
import MenuItemDetailComponent from '@/app/stores/[storeId]/_detail';
import CartComponent from '@/app/stores/[storeId]/_cart';

type Params = {
  storeId: string | number;
};

type SearchParams = {
  sid?: string;
};

export type StoreArgs = {
  params: Params;
  searchParams: SearchParams;
};

export default function OrderIndex({ params, searchParams }: StoreArgs) {
  const [openCartModal, setOpenCartModal] = useState<boolean>(false);
  const [detailTarget, setDetailTarget] = useState<MenuItemType>();

  const { data, error } = useSWR<Array<MenuItemType>>(
    STORE_API.getAll(params.storeId),
  );
  if (error) return <p>Error</p>;
  if (!data) return <Loading />;

  const onCloseOrderDetailModal = () => {
    setDetailTarget(undefined);
  };

  const onClickItem = (item: MenuItemType) => {
    setDetailTarget(item);
  };

  const items = data.map((item, idx) => {
    return (
      <div
        className={`column is-half-mobile is-one-quarter-tablet ${styles.item}`}
        key={idx}
        onClick={() => onClickItem(item)}
      >
        <MenuItemComponent props={{ item }} />
      </div>
    );
  });

  return (
    <>
      <div
        className={`columns is-multiline is-centered is-mobile mt-2 ${styles.storeColumns}`}
      >
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
        isActive={detailTarget !== undefined}
        onClose={onCloseOrderDetailModal}
        testId={ORDER_TEST_ID.MENU_ITEM_DETAIL_MODAL}
      >
        {detailTarget ? (
          <MenuItemDetailComponent
            props={{ menuItem: detailTarget }}
            onClickOrder={() => setDetailTarget(undefined)}
          />
        ) : (
          <p>invalid error</p>
        )}
      </Modal>

      {/* カートモーダル */}
      <Modal
        isActive={openCartModal}
        onClose={() => setOpenCartModal(false)}
        testId={ORDER_TEST_ID.CART_MODAL}
      >
        <CartComponent
          props={{ menuItems: data }}
          params={params}
          searchParams={searchParams}
        />
      </Modal>
    </>
  );
}

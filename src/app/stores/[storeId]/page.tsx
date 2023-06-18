'use client';

import useSWR from 'swr';
import { STORE_API } from '@/constants/api';
import MenuItem from '@/app/stores/[storeId]/_item';
import styles from '@/styles/pages/store.module.scss';
import Modal from '@/components/modal';
import { useState } from 'react';
import { MenuItemType } from '@/types/order';
import Loading from '@/components/loading';
import { ORDER_TEST_ID } from '@/constants/testid/stores';
import MenuItemDetail from '@/app/stores/[storeId]/_detail';
import Cart from '@/app/stores/[storeId]/_cart';
import Drawer from '@/components/drawer';

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
  const [showCategory, setShowCategory] = useState<boolean>(false);
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
        <MenuItem item={item} />
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

      <Drawer isShowing={showCategory}>
        <span onClick={() => setShowCategory(false)}>test</span>
      </Drawer>

      <span
        className={`icon is-large has-background-link-light ${styles.menuIcon}`}
        onClick={() => setShowCategory(true)}
        data-testid={ORDER_TEST_ID.OPEN_CART_MODAL_BUTTON}
      >
        <i className='fas fa-lg fa-solid fa-bars has-text-link-dark'></i>
      </span>
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
          <MenuItemDetail
            menuItem={detailTarget}
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
        <Cart
          props={{ menuItems: data }}
          params={params}
          searchParams={searchParams}
        />
      </Modal>
    </>
  );
}

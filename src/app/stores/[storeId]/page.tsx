'use client';

import useSWR from 'swr';
import { STORE_API } from '@/constants/api';
import styles from '@/styles/pages/store.module.scss';
import Modal from '@/components/atoms/modal';
import { useState } from 'react';
import { MenuItemType, StoreInfoType } from '@/types/store/order';
import Loading from '@/components/atoms/loading';
import { ORDER_TEST_ID } from '@/constants/testid/stores';
import MenuItemDetail from '@/components/organisms/order/detail';
import Cart from '@/components/organisms/order/cart';
import Drawer from '@/components/atoms/drawer';
import Category from '@/components/organisms/order/category';
import { ID } from '@/types';
import Menu from '@/components/organisms/order/menu';

type Params = {
  storeId: ID;
};

type SearchParams = {
  sid?: ID;
  categoryId?: ID;
};

export type StoreArgs = {
  params: Params;
  searchParams: SearchParams;
};

export default function OrderIndex({ params, searchParams }: StoreArgs) {
  const [openCartModal, setOpenCartModal] = useState<boolean>(false);
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const [detailTarget, setDetailTarget] = useState<MenuItemType>();

  const { data, error, isLoading } = useSWR<StoreInfoType>(
    STORE_API.storeInfo(params.storeId),
  );
  if (isLoading) return <Loading />;
  if (error) return <p>Error</p>;
  searchParams.categoryId = data?.defaultCategoryId;

  const onCloseOrderDetailModal = () => {
    setDetailTarget(undefined);
  };

  // const onClickItem = (item: MenuItemType) => {
  //   setDetailTarget(item);
  // };

  return (
    <>
      <div
        className={`columns is-multiline is-centered is-mobile mt-2 ${styles.storeColumns}`}
      >
        <Menu storeId={params.storeId} genreId={searchParams.categoryId} />
      </div>

      <Drawer isShowing={showCategory} onClose={() => setShowCategory(false)}>
        <div className={styles.category}>
          {data?.categories ? (
            <Category
              items={data.categories}
              currentId={searchParams.categoryId}
            />
          ) : (
            <Loading />
          )}
        </div>
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
          props={{ menuItems: [] }}
          params={params}
          searchParams={searchParams}
        />
      </Modal>
    </>
  );
}

'use client';

import useSWR from 'swr';
import { FetchItemDaoModel } from '@/dao/order';
import { STORE_API } from '@/constants/api';
import ItemComponent from '@/app/stores/[storeId]/_item';
import styles from '@/app/stores/[storeId]/styles.module.scss';
import Modal from '@/components/modal';
import { useState } from 'react';

type Params = {
  storeId: string;
};

type SearchParams = {
  sid?: string;
};

type Args = {
  params: Params;
  searchParams: SearchParams;
};

export default function OrderIndex({ params }: Args) {
  const [item, setItem] = useState<FetchItemDaoModel>();
  const { data, error } = useSWR<Array<FetchItemDaoModel>>(
    STORE_API.getAll(params.storeId),
  );
  if (error) return <p>Error</p>;
  if (!data) return <p>Loading</p>;

  const items = data.map((item, idx) => (
    <div
      className={`column is-two-fifths-mobile is-one-quarter-tablet ${styles.item}`}
      key={idx}
      onClick={() => setItem(item)}
    >
      <ItemComponent item={item} />
    </div>
  ));
  return (
    <>
      <div className={`columns is-multiline is-centered is-mobile mt-2`}>
        {items}
      </div>
      <Modal isActive={item !== undefined} onClose={() => setItem(undefined)}>
        {item ? <p>{item.name}</p> : <p>unexpect error</p>}
        <div className={styles.inputNumber}>
          <span>+</span>
          <input className='input' type='text' placeholder='個数' />
          <span>-</span>
        </div>
        <button className='button is-outlined'>カートに入れる</button>
      </Modal>
    </>
  );
}

'use client';

import useSWR from 'swr';
import { FetchItemDaoModel } from '@/dao/order';
import { STORE_API } from '@/constants/api';
import ItemComponent from '@/app/stores/[storeId]/_item';
import styles from '@/app/stores/[storeId]/styles.module.scss';

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
  const { data, error } = useSWR<Array<FetchItemDaoModel>>(
    STORE_API.getAll(params.storeId),
  );
  if (error) return <p>Error</p>;
  if (!data) return <p>Loading</p>;

  const items = data.map((item, idx) => (
    <div className={`column ${styles.item}`} key={idx}>
      <ItemComponent item={item} />
    </div>
  ));
  return (
    <>
      <div className={`columns is-variable is-1-mobile ${styles.container}`}>
        {items}
      </div>
    </>
  );
}

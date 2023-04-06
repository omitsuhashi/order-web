'use client';

import useSWR from 'swr';
import { FetchItemDaoModel } from '@/dao/order';
import { STORE_API } from '@/constants/api';
import ItemComponent from '@/app/stores/[storeId]/_item';

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

export default function OrderIndex({ params, searchParams }: Args) {
  const { data, error } = useSWR<Array<FetchItemDaoModel>>(
    STORE_API.getAll(params.storeId),
  );
  if (error) return <p>Error</p>;
  if (!data) return <p>Loading</p>;

  const items = data.map((item, idx) => (
    <ItemComponent item={item} key={idx} />
  ));
  return (
    <>
      <div>storeId: {params.storeId}</div>
      <div>sid: {searchParams.sid}</div>
      {items}
    </>
  );
}

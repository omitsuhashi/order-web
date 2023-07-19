import useSWR from 'swr';
import { MenuItemType } from '@/types/store/order';
import { STORE_API } from '@/constants/api';
import { ID } from '@/types';
import React, { PropsWithoutRef } from 'react';
import styles from '@/styles/pages/store.module.scss';
import MenuItem from '@/components/organisms/order/menu-item';
import Loading from '@/components/atoms/loading';

type Props = {
  storeId: ID;
  genreId?: ID;
};

function Menu({ storeId, genreId }: PropsWithoutRef<Props>) {
  const { data, error, isLoading } = useSWR<Array<MenuItemType>>(
    STORE_API.getMenu(storeId, genreId),
  );

  if (isLoading) return <Loading />;
  if (error) return <p>Error</p>;

  return data?.map((item, idx) => {
    return (
      <div
        className={`column is-half-mobile is-one-quarter-tablet ${styles.item}`}
        key={idx}
        // onClick={() => onClickItem(item)}
      >
        <MenuItem item={item} />
      </div>
    );
  });
}

export default React.memo(Menu);

import { FetchItemDaoModel } from '@/dao/order';

type Props = {
  item: FetchItemDaoModel;
};

export default function ItemComponent({ item }: Props) {
  return (
    <>
      <div className={'box'} data-testid={'item'}>
        {item.name} - {item.price}
      </div>
    </>
  );
}

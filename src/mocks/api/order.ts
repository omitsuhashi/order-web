import { rest } from 'msw';
import { STORE_API } from '@/constants/api';
import { FetchItemDaoModel } from '@/dao/order';

const orderMocks = [
  rest.get(STORE_API.getAll('mock'), (req, res, context) => {
    const result: Array<FetchItemDaoModel> = [
      {
        name: '青椒肉絲',
        price: 1000,
      },
      {
        name: '春巻き',
        price: 500,
      },
      {
        name: '餃子',
        price: 500,
      },
    ];
    return res(context.json(result));
  }),
];

export default orderMocks;

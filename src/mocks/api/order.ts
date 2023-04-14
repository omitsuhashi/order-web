import { rest } from 'msw';
import { STORE_API } from '@/constants/api';
import { FetchItemDaoModel } from '@/dao/order';
import { generateRandomNumber, generateRandomString } from '@/mocks/api/util';

const orderMocks = [
  rest.get(STORE_API.getAll('mock'), (req, res, context) => {
    const result: Array<FetchItemDaoModel> = [
      {
        id: 1,
        name: '青椒肉絲',
        price: 1000,
      },
      {
        id: 2,
        name: '春巻き',
        price: 500,
      },
      {
        id: 3,
        name: '餃子',
        price: 500,
      },
    ];
    return res(context.json(result));
  }),
  rest.get(STORE_API.getAll('10'), (req, res, context) => {
    const result = Array.from({ length: 10 }).map(
      (_, idx): FetchItemDaoModel => {
        return {
          id: idx + 1,
          name: generateRandomString(5),
          price: generateRandomNumber(10000),
        };
      },
    );
    return res(context.json(result));
  }),
];

export default orderMocks;

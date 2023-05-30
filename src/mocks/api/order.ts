import { rest } from 'msw';
import { STORE_API } from '@/constants/api';
import { generateRandomNumber, generateRandomString } from '@/mocks/api/util';
import { MenuItemType } from '@/stores/order/types';

const orderMocks = [
  rest.get(STORE_API.getAll('mock'), (req, res, context) => {
    const result: Array<MenuItemType> = [
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
    const result = Array.from({ length: 10 }).map((_, idx): MenuItemType => {
      return {
        id: idx + 1,
        name: generateRandomString(5),
        description: generateRandomString(100),
        price: generateRandomNumber(10000),
      };
    });
    return res(context.json(result));
  }),
  rest.post(STORE_API.order('10'), (req, res, context) => {
    return res(context.status(200), context.json(req));
  }),
  rest.post(STORE_API.order('error'), (req, res, context) => {
    return res(context.status(400));
  }),
];

export default orderMocks;

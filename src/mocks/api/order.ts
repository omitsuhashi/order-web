import { rest } from 'msw';
import { STORE_API } from '@/constants/api';
import { generateRandomNumber, generateRandomString } from '@/mocks/api/util';
import { CategoryType, MenuItemType, MenuType } from '@/types/store/order';

const orderMocks = [
  rest.get(STORE_API.getMenu(1), (req, res, context) => {
    const items: Array<MenuItemType> = [
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
    const result: MenuType = {
      items,
      genreId: 3,
    };
    return res(context.json(result));
  }),
  rest.get(STORE_API.getMenu(10), (req, res, context) => {
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
  rest.post(STORE_API.order(10), (req, res, context) => {
    return res(context.status(200), context.json(req));
  }),
  rest.post(STORE_API.order('error'), (req, res, context) => {
    return res(context.status(400));
  }),
  rest.get(STORE_API.getGenreList(10), (req, res, context) => {
    const result: Array<CategoryType> = [
      {
        genre: '飲み物',
        children: [
          { id: 1, label: 'ビール' },
          { id: 2, label: 'カクテル' },
        ],
      },
      {
        genre: '食べ物',
        children: [
          {
            id: 3,
            label: '中華',
          },
          {
            id: 4,
            label: 'ラーメン',
          },
        ],
      },
    ];
    return res(context.status(200), context.json(result));
  }),
];

export default orderMocks;

import { fireEvent } from '@testing-library/dom';
import { screen } from '@testing-library/react';
import testRender from '../../../jest';
import '@testing-library/jest-dom';
import { server } from '@/mocks/server';
import OrderIndex from '@/app/stores/[storeId]/page';
import { ORDER_TEST_ID } from '@/constants/testid/stores';

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('order', () => {
  describe('fetch order list', () => {
    it('should fetch items and render correctly', async () => {
      testRender(<OrderIndex params={{ storeId: 'mock' }} searchParams={{}} />);
      const element = await screen.findAllByTestId(
        ORDER_TEST_ID.MENU_ITEM_COMPONENT,
      );
      const size = element.length;
      expect(size).toBe(3);
    });
  });
  describe('order items', () => {
    it('should complete send order request', async () => {
      testRender(<OrderIndex params={{ storeId: 10 }} searchParams={{}} />);

      const items = await screen.findAllByTestId(
        ORDER_TEST_ID.MENU_ITEM_COMPONENT,
      );
      if (items.length > 0) fireEvent.click(items[0]);
      const orderModal = await screen.findByTestId(
        ORDER_TEST_ID.MENU_ITEM_DETAIL_MODAL,
      );

      expect(orderModal).toHaveClass('is-active');
      const updateCartButton = await screen.findByTestId(
        ORDER_TEST_ID.UPDATE_CART_BUTTON,
      );

      fireEvent.click(updateCartButton);

      expect(orderModal).not.toHaveClass('is-active');

      const openCartButton = await screen.findByTestId(
        ORDER_TEST_ID.OPEN_CART_MODAL_BUTTON,
      );
      fireEvent.click(openCartButton);

      const sendOrder = await screen.findByTestId(ORDER_TEST_ID.ORDER_BUTTON);
      fireEvent.click(sendOrder);
    });
  });
});

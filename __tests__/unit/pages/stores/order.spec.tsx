import { fireEvent, waitForElementToBeRemoved } from '@testing-library/dom';
import { screen } from '@testing-library/react';
import testRender from '@/libs/jest';
import '@testing-library/jest-dom';
import { server } from '@/mocks/server';
import OrderIndex from '@/app/stores/[storeId]/page';

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('order', () => {
  describe('fetch order list', () => {
    it('should fetch items and render correctly', async () => {
      testRender(<OrderIndex params={{ storeId: 'mock' }} searchParams={{}} />);
      await waitForElementToBeRemoved(() => screen.queryByText('Loading'));
      const element = await screen.findAllByTestId('item');
      const size = element.length;
      expect(size).toBe(3);
    });
  });
  describe('order items', () => {
    it('should open item modal and add cart', async () => {
      testRender(<OrderIndex params={{ storeId: 10 }} searchParams={{}} />);
      await waitForElementToBeRemoved(() => screen.queryByText('Loading'));

      const items = await screen.findAllByTestId('item');
      if (items.length > 0) fireEvent.click(items[0]);
      const orderModal = await screen.findByTestId('order-detail-modal');

      expect(orderModal).toHaveClass('is-active');
    });
  });
});

import { waitForElementToBeRemoved } from '@testing-library/dom';
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
});

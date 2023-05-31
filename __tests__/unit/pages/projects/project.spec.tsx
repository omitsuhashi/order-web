import Project from '@/app/projects/_project';
import { waitForElementToBeRemoved } from '@testing-library/dom';
import { screen } from '@testing-library/react';
import testRender from '../../../jest';
import '@testing-library/jest-dom';
import { server } from '@/mocks/server';

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('projects', () => {
  describe('fetch a project', () => {
    it('should fetch project by id: a', async () => {
      testRender(<Project projectId={'a'}></Project>);
      await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
      const element = screen.queryByText('b');
      expect(element).toBeInTheDocument();
    });
  });
});

describe('failed', () => {
  describe('fetch a project', () => {
    it('should failed with 403 code', async () => {
      testRender(<Project projectId={'failed'}></Project>);
      await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
      const element = screen.queryByText('Error...');
      expect(element).toBeInTheDocument();
    });
  });
});

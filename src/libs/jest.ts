import { render } from '@testing-library/react';
import { ReactElement } from 'react';
import { TestSwrConfig } from './swr';

const testRender = (ui: ReactElement) => {
  render(ui, { wrapper: TestSwrConfig });
};

export default testRender;

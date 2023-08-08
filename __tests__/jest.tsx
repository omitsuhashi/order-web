import { render } from '@testing-library/react';
import { PropsWithChildren, ReactElement } from 'react';
import { TestSwrConfig } from '@/libs/swr';

const testRender = (ui: ReactElement) => {
  const wrapper = (props: PropsWithChildren) => (
    <TestSwrConfig>{props.children}</TestSwrConfig>
  );
  render(ui, { wrapper });
};

export default testRender;

import { render } from '@testing-library/react';
import { PropsWithChildren, ReactElement } from 'react';
import { TestSwrConfig } from '@/libs/swr';
import { RecoilRoot } from 'recoil';

const testRender = (ui: ReactElement) => {
  const wrapper = (props: PropsWithChildren) => (
    <RecoilRoot>
      <TestSwrConfig>{props.children}</TestSwrConfig>
    </RecoilRoot>
  );
  render(ui, { wrapper });
};

export default testRender;

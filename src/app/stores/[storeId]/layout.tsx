'use client';

import { PropsWithChildren } from 'react';
import SwrSession from '@/libs/swr';
import runMock from '@/mocks';
import { RecoilRoot } from 'recoil';

if (process.env.NODE_ENV === 'development') {
  runMock();
}

export default function OrderLayout(props: PropsWithChildren) {
  return (
    <SwrSession>
      <RecoilRoot>{props.children}</RecoilRoot>
    </SwrSession>
  );
}

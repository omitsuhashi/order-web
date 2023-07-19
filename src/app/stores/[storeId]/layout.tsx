import { PropsWithChildren } from 'react';
import SwrSession from '@/libs/swr';
import runMock from '@/mocks';

if (process.env.NODE_ENV === 'development') {
  runMock();
}

export default function OrderLayout(props: PropsWithChildren) {
  return <SwrSession>{props.children}</SwrSession>;
}

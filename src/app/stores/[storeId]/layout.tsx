'use client';

import { PropsWithChildren } from 'react';
import SwrSession from '@/libs/swr';
import { worker } from '@/mocks/browser';

if (process.env.NODE_ENV === 'development') {
  worker.start().then();
}

export default function OrderLayout(props: PropsWithChildren) {
  return <SwrSession>{props.children}</SwrSession>;
}

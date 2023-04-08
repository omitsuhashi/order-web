import { PropsWithChildren } from 'react';
import fetcher from './axios';
import { SWRConfiguration, SWRConfig } from 'swr';

type BBSwrConfigProps = { config?: SWRConfiguration };

const SwrSession = (value: PropsWithChildren<BBSwrConfigProps>) => {
  const _config: SWRConfiguration = {
    ...value.config,
    fetcher,
  };
  return <SWRConfig value={_config}>{value.children}</SWRConfig>;
};

export const TestSwrConfig = (props: PropsWithChildren) => {
  return (
    <SWRConfig
      value={{
        dedupingInterval: 0,
        provider: () => new Map(),
        fetcher,
      }}
    >
      {props.children}
    </SWRConfig>
  );
};

export default SwrSession;

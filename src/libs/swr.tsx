import { PropsWithChildren } from 'react';
import fetcher from './axios';
import { SWRConfiguration, SWRConfig } from 'swr';

type BBSwrConfigProps = { config?: SWRConfiguration };

const BBSwrConfig = (props: PropsWithChildren<BBSwrConfigProps>) => {
  const _config: SWRConfiguration = {
    ...props.config,
    fetcher,
  };
  return <SWRConfig value={_config}>{props.children}</SWRConfig>;
};

export const TestSwrConfig = (props: PropsWithChildren) => {
  return (
    <SWRConfig
      value={{
        dedupingInterval: 0,
        provider: () => new Map(),
        fetcher: fetcher,
      }}
    >
      {props.children}
    </SWRConfig>
  );
};

export default BBSwrConfig;

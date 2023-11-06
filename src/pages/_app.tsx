import type {ReactElement, ReactNode} from 'react';
import type {NextPage} from 'next';
import type {AppProps} from 'next/app';

import {SessionProvider} from 'next-auth/react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {CssBaseline, ThemeProvider} from '@mui/material';
import theme from '@/styles/theme/commonTheme';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: {session, ...pageProps},
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);

  return getLayout(
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>,
  );
}

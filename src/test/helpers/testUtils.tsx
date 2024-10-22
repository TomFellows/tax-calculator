import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RenderOptions, render as rtlRender } from '@testing-library/react';
import { ReactNode } from 'react';
import { TaxContext, TaxContextValue } from '../../context/TaxContext';
import { theme } from '../../theme';

const createWrapper = () => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const client = new QueryClient();

    return (
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </ThemeProvider>
    );
  };

  return Wrapper;
};

const createWrapperWithContext = ({ initialContext }: { initialContext: TaxContextValue }) => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const client = new QueryClient();

    return (
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={client}>
          <TaxContext.Provider value={initialContext}>{children}</TaxContext.Provider>
        </QueryClientProvider>
      </ThemeProvider>
    );
  };

  return Wrapper;
};

export const render = (
  ui: ReactNode,
  { initialContext, ...options }: { initialContext: TaxContextValue; options: RenderOptions },
) => {
  const wrapper = initialContext ? createWrapperWithContext({ initialContext }) : createWrapper();
  return rtlRender(ui, { wrapper, ...options });
};

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

//query client is a cache which help us to keep track of the data
const client = new QueryClient();

const Providers = ({ children }: PropsWithChildren<{}>) => {
  // they contain react children and provide context to rest of the application
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default Providers;

'use client'
import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react';

const queryclient = new QueryClient();

const QueryClientProvider = ({children}: PropsWithChildren) => {
  return (
<ReactQueryClientProvider client={queryclient}>
{children}
</ReactQueryClientProvider>
  )
}

export default QueryClientProvider

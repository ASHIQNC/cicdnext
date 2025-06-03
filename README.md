## Tenstack react query

this package is used for fetching the api
Link: https://tanstack.com/query/latest/docs/framework/react/installation
npm i @tanstack/react-query

steps:
after the above steps

1. create a provider.tsx file in component folder

example :
'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

//query client is a cache which help us to keep track of the data
const client=new QueryClient()

const Providers=({children}:PropsWithChildren<{}>)=>{
// they contain react children and provide context to rest of the application
return <QueryClientProvider client={client}>
{children}
</QueryClientProvider>
}

export default Providers

2. Next go the layout.tsx and wrap with the provider

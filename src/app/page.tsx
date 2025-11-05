
import {trpc, getQueryClient} from '@/trpc/server'
import { Client } from './client';
import { get } from 'http';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';

const page = async  () => {
 const queryClient= getQueryClient()
 void queryClient.prefetchQuery(trpc.getUsers.queryOptions())

 return(
  <HydrationBoundary state={dehydrate(queryClient)}>
    <Suspense fallback={<div>Loading...</div>}>
      <Client  />
    </Suspense>
  </HydrationBoundary>
)

}

export default page
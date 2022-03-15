import 'cross-fetch/polyfill';
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
// Generated
import config from 'temp/config';

const graphQLClientFactory = (endpoint?: string): ApolloClient<NormalizedCacheObject> => {
  const uri = endpoint ?? config.graphQLEndpoint;

  // Batches an array of individual GraphQL operations into a
  // single HTTP request that's sent to a single GraphQL endpoint.
  const link = new BatchHttpLink({
    uri,
    batchInterval: 10, // Wait no more than 10ms after first batched operation
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    credentials: 'include',
    ssrForceFetchDelay: 100,
    ssrMode: typeof window === 'undefined',
    headers: {
      connection: 'keep-alive',
    },
    link,
  });
};

export default graphQLClientFactory;

import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { HttpLink } from '@apollo/client/link/http'
import { SchemaLink } from '@apollo/client/link/schema'

import { cache } from './cache'
import { ResolverContext } from './types'

function createIsomorphLink(context?: ResolverContext) {
  if (context && typeof window === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { schema } = require('./schema')

    return new SchemaLink({ schema, context })
  }

  return new HttpLink({
    uri: '/api/graphql',
    credentials: 'same-origin',
  })
}

function initApolloClient(context?: ResolverContext) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(context),
    cache,
  })
}

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

export function getApolloClient(initialState: any = null, context?: ResolverContext) {
  if (!apolloClient) {
    apolloClient = initApolloClient(context)
  }

  if (initialState) {
    apolloClient.cache.restore(initialState)
  }

  return apolloClient
}

/* eslint-disable @typescript-eslint/no-var-requires */
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

import { cache } from './cache'
import { ResolverContext } from './types'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

function isSSG() {
  return typeof window === 'undefined'
}

function createIsomorphLink(context: ResolverContext = {}) {
  if (isSSG()) {
    const { SchemaLink } = require('@apollo/client/link/schema')
    const { schema } = require('./schema')

    return new SchemaLink({ schema, context })
  }

  const { HttpLink } = require('@apollo/client')

  return new HttpLink({
    uri: '/api/graphql',
    credentials: 'same-origin',
  })
}

function createApolloClient(context?: ResolverContext) {
  return new ApolloClient({
    ssrMode: isSSG(),
    link: createIsomorphLink(context),
    cache,
  })
}

export function getApolloClient(
  initialState: any = null,
  // Pages with Next.js data fetching methods, like `getStaticProps`, can send
  // a custom context which will be used by `SchemaLink` to server render pages
  context?: ResolverContext,
) {
  const _apolloClient = apolloClient ?? createApolloClient(context)

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState)
  }

  // For SSG and SSR always create a new Apollo Client
  if (isSSG()) return _apolloClient

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

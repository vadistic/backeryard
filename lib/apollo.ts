/* eslint-disable @typescript-eslint/no-var-requires */
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { IncomingMessage, ServerResponse } from 'http'
import { useMemo } from 'react'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

export type ResolverContext = {
  req?: IncomingMessage
  res?: ServerResponse
}

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
    cache: new InMemoryCache(),
  })
}

export function initializeApollo(
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

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}

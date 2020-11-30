import { ApolloServer } from 'apollo-server-micro'

import { initFirebaseNode } from '../firebase/node'

import { schema } from './schema'
import { ResolverContextParams, ResolverContext } from './types'

const IS_DEV = process.env.NODE_ENV === 'development'

export function getResolverContext(_params: ResolverContextParams = {}): ResolverContext {
  // const token = ctx.req?.headers.authorization?.split(' ')[1]
  const fb = initFirebaseNode()

  return {
    fs: fb.firestore(),
    auth: fb.auth(),
  }
}

export const apolloServer = new ApolloServer({
  schema,
  introspection: IS_DEV,
  context: getResolverContext,
})

import { ApolloServer } from 'apollo-server-micro'

import { verifyToken } from '../firebase/admin'

import { schema } from './schema'
import { ResolverContext } from './types'

const IS_DEV = process.env.NODE_ENV === 'development'

export async function getContext(ctx: ResolverContext) {
  const token = ctx.req?.headers.authorization?.split(' ')[1]

  const user = token ? verifyToken(token) : undefined

  return {
    ...ctx,
    user,
  }
}

export const apolloServer = new ApolloServer({
  schema,
  introspection: IS_DEV,
  context: getContext,
})

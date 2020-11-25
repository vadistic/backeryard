import { ApolloServer } from 'apollo-server-micro'

import { schema } from './schema'

const IS_DEV = process.env.NODE_ENV === 'development'

export const apolloServer = new ApolloServer({
  schema,
  introspection: IS_DEV,
})

import { ApolloServer } from 'apollo-server-micro'

import { schema } from '../../lib/schema'

const IS_DEV = process.env.NODE_ENV === 'development'

const apolloServer = new ApolloServer({
  schema,
  introspection: IS_DEV,
  playground: IS_DEV,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({
  path: '/api/graphql',
})

import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { makeExecutableSchema } from 'apollo-server-micro'

import rootSchema from '../services/status/status.graphqls'
import statusResolver from '../services/status/status.resolver'
import userSchema from '../services/user/user.graphqls'
import userResolver from '../services/user/user.resolver'

import { ResolverContext } from './types'

export const typeDefs = mergeTypeDefs([rootSchema, userSchema])

export const resolvers = mergeResolvers<ResolverContext, any>([statusResolver, userResolver])

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

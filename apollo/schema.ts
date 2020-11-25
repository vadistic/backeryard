import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { makeExecutableSchema } from 'apollo-server-micro'

import rootSchema from './feature/root.graphqls'
import { rootResolvers } from './feature/root.resolver'
import userSchema from './feature/user.graphqls'
import { userResolvers } from './feature/user.resolver'
import { ResolverContext } from './types'

export const typeDefs = mergeTypeDefs([rootSchema, userSchema])

export const resolvers = mergeResolvers<ResolverContext, any>([rootResolvers, userResolvers])

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

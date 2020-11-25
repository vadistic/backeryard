import { Resolvers } from '../schema.graphqls'
import { ResolverContext } from '../types'

export const rootResolvers: Resolvers<ResolverContext> = {
  Query: {
    status: () => true,
  },
}

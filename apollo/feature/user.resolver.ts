import { Resolvers } from '../schema.graphqls'
import { ResolverContext } from '../types'

const userProfile = {
  id: String(1),
  name: 'John Smith',
  status: 'cached',
}

export const userResolvers: Resolvers<ResolverContext> = {
  Query: {
    viewer(_parent, _args, _context, _info) {
      return userProfile
    },
  },
  Mutation: {
    updateName(_parent, _args, _context, _info) {
      userProfile.name = _args.name
      return userProfile
    },
  },
}

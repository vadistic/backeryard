import { ResolverContext } from './apollo'
import { QueryResolvers, MutationResolvers } from './schema.graphqls'

const userProfile = {
  id: String(1),
  name: 'John Smith',
  status: 'cached',
}

const Query: Required<QueryResolvers<ResolverContext>> = {
  viewer(_parent, _args, _context, _info) {
    return userProfile
  },
}

const Mutation: Required<MutationResolvers<ResolverContext>> = {
  updateName(_parent, _args, _context, _info) {
    userProfile.name = _args.name
    return userProfile
  },
}

export const resolvers = {
  Query,
  Mutation,
}

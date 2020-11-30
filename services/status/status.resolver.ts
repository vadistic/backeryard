import { ResolverContext } from '../../apollo/types'
import { Resolvers } from '../schema.graphqls'

const resolvers: Resolvers<ResolverContext> = {
  Query: {
    status: () => true,
  },
}

export default resolvers

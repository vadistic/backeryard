import { collection, all } from 'typesaurus'

import { ResolverContext } from '../../apollo/types'

import { UserModel } from './user.model'

export const userCollection = collection<UserModel>('user')

export async function findManyProducers(_ctx: ResolverContext) {
  const docs = await all(userCollection)

  return docs.map(doc => doc.data)
}

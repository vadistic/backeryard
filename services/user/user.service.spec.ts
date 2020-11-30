import { getResolverContext } from '../../apollo/server'
import { ResolverContext } from '../../apollo/types'

import { findManyProducers } from './user.service'

describe('user', () => {
  const ctx: ResolverContext = getResolverContext()

  it('list producers', async () => {
    const res = await findManyProducers(ctx)

    expect(res.length).toBeGreaterThanOrEqual(0)
  })
})

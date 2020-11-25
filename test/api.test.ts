import { StatusQueryDocument, StatusQuery } from '../apollo/queries/status.graphql'

import { client } from './client'

describe('api', () => {
  it('status ok', async () => {
    const res = await client.query<StatusQuery>({
      query: StatusQueryDocument,
    })

    expect(res.data?.status).toBe(true)
    expect(res.errors).toBeFalsy()
  })
})

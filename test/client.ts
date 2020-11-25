import { createTestClient } from 'apollo-server-testing'

import { apolloServer } from '../apollo/server'

export const client = createTestClient(apolloServer)

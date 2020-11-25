import { IncomingMessage, ServerResponse } from 'http'

import { FirebaseUser } from '../firebase/types'

export type ResolverContext = {
  req?: IncomingMessage
  res?: ServerResponse
  user?: FirebaseUser
}

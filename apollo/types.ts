import type { firestore, auth } from 'firebase-admin'
import type { IncomingMessage, ServerResponse } from 'http'

import type { FirebaseUser } from '../firebase/types'

export interface ResolverContextParams {
  req?: IncomingMessage
  res?: ServerResponse
}

export interface ResolverContext {
  user?: FirebaseUser
  fs: firestore.Firestore
  auth: auth.Auth
}

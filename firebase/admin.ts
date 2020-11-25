import admin from 'firebase-admin'

import { FirebaseUser } from './types'

let firebaseAdmin: admin.app.App

export function getFirebase() {
  if (!firebaseAdmin) {
    firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_SERVICE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_SERVICE_PRIVATE_KEY,
      }),
      projectId: process.env.FIREBASE_PROJECT_ID,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      serviceAccountId: process.env.FIREBASE_SERVICE_CLIENT_EMAIL,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    })
  }

  return firebaseAdmin
}

export function getFirestore() {
  return getFirebase().firestore()
}

// ────────────────────────────────────────────────────────────────────────────────

export function mapIdtoken(token: admin.auth.DecodedIdToken): FirebaseUser {
  return {
    id: token.uid,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    email: token.email!,
    verified: !!token.email_verified,
    name: undefined,
  }
}

export async function verifyToken(token: string): Promise<FirebaseUser | undefined> {
  try {
    const decodedToken = await getFirebase().auth().verifyIdToken(token)

    return mapIdtoken(decodedToken)
  } catch (e) {
    // noop
  }
}

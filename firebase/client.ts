import firebase from 'firebase/app'

import 'firebase/auth'
// import 'firebase/firestore'
// import 'firebase/storage'
import 'firebase/analytics'
import { FirebaseUser } from './types'

// https://firebase.google.com/docs/web/setup
const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

let firebaseClient: firebase.app.App

export function getFirebase() {
  if (firebaseClient) return firebaseClient

  firebaseClient = firebase.initializeApp(clientCredentials)

  if (process.env.NODE_ENV === 'production') {
    firebaseClient.analytics()
    firebaseClient.performance()
  }

  firebaseClient.auth().languageCode = 'pl'

  return firebaseClient
}

export function mapFirebaseUser(user: firebase.User): FirebaseUser {
  return {
    id: user.uid,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    email: user.email!,
    verified: !!user.emailVerified,
    name: user.displayName ?? undefined,
  }
}

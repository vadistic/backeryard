import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'
// import 'firebase/storage'
import 'firebase/analytics'

// https://firebase.google.com/docs/web/setup
const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

export let firebaseApp: firebase.app.App

export function initFirebaseWeb() {
  if (firebaseApp) return firebaseApp

  firebaseApp = firebase.initializeApp(clientCredentials)

  if (process.env.NODE_ENV === 'production') {
    firebaseApp.analytics()
    firebaseApp.performance()
  }

  firebaseApp.auth().languageCode = 'pl'

  return firebaseApp
}

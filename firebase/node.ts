import firebase from 'firebase-admin'

export let firebaseApp: firebase.app.App

export function initFirebaseNode() {
  if (firebaseApp) return firebaseApp

  firebaseApp = firebase.initializeApp({
    credential: firebase.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_SERVICE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_SERVICE_PRIVATE_KEY,
    }),
    projectId: process.env.FIREBASE_PROJECT_ID,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    serviceAccountId: process.env.FIREBASE_SERVICE_CLIENT_EMAIL,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  })

  return firebaseApp
}

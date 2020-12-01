import 'reflect-metadata'
import dotenv from 'dotenv'

import { firebaseApp, initFirebaseNode } from '../../firebase/node'

dotenv.config()

beforeAll(() => {
  initFirebaseNode()
})

afterAll(() => {
  firebaseApp.delete()
})

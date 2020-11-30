import 'reflect-metadata'
import dotenv from 'dotenv'

import { firebaseApp } from '../../firebase/node'

dotenv.config()

afterAll(() => {
  firebaseApp?.firestore().terminate()
})

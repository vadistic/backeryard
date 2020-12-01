import 'reflect-metadata'
import dotenv from 'dotenv'

import { initFirebaseNode } from '../../firebase/node'
import { clean, seed } from '../seed'

async function seedScript() {
  dotenv.config()

  const fb = initFirebaseNode()
  await clean()
  await seed()

  await fb.delete()
}

seedScript()

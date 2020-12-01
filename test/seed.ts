/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { auth } from 'firebase-admin'

import { firebaseApp } from '../firebase/node'
import { consumers } from '../services/consumer/consumer.model'
import { createConsumer } from '../services/consumer/consumer.service'
import {
  producerConsumersRel,
  producers,
  producerUsersRel,
} from '../services/producer/producer.model'
import { createProducer } from '../services/producer/producer.service'
import { userConsumersRel, userProducersRel, users } from '../services/user/user.model'
import { createUser } from '../services/user/user.service'
import { deleteCollection, mapUserRecord } from '../services/utils'

export async function clean() {
  await deleteCollection(users, [userConsumersRel, userProducersRel])
  await deleteCollection(producers, [producerUsersRel])
  await deleteCollection(consumers, [producerUsersRel, producerConsumersRel])
}

export async function seed() {
  // ────────────────────────────────────────────────────────────────────────────────
  // USERS

  const auth = firebaseApp.auth()

  const getOrCreateUser = async (data: auth.CreateRequest) => {
    const user = await auth.getUserByEmail(data.email!)

    if (user) return user

    return auth.createUser(data)
  }

  const adminUserRecord = await getOrCreateUser({
    emailVerified: true,
    email: 'admin@example.com',
    password: 'password',
    displayName: 'Admin User',
  })

  const adminUser = mapUserRecord(adminUserRecord)

  const producerUserRecord = await getOrCreateUser({
    emailVerified: true,
    email: 'producer@example.com',
    password: 'password',
    displayName: 'Producer User',
  })

  const producerUser = mapUserRecord(producerUserRecord)

  const consumerUserRecord = await getOrCreateUser({
    emailVerified: true,
    email: 'consumer@example.com',
    password: 'password',
    displayName: 'Consumer User',
  })

  const consumerUser = mapUserRecord(consumerUserRecord)

  /* const adminUserRef = */ await createUser(adminUser)
  const producerUserRef = await createUser(producerUser)
  const consumerUserRef = await createUser(consumerUser)

  // ────────────────────────────────────────────────────────────────────────────────
  // PRODUCER

  const producerRef = await createProducer({
    userRef: producerUserRef,
    name: 'Backery Producer',
  })

  /* const consumerRef = */ await createConsumer({
    userRef: consumerUserRef,
    producerRef,
    name: 'Backery Consumer',
  })

  console.log('Seed done!')
}

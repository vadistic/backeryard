import { add, all, get } from 'typesaurus'

import { userProducersRel, users } from '../user/user.model'
import { allRelations, addRelation, RefID, toRef } from '../utils'

import {
  Producer,
  producerConsumersRel,
  ProducerCreateData,
  producers,
  producerUsersRel,
} from './producer.model'

export async function allProducers() {
  return all(producers)
}

export async function getProducer(refId: RefID<Producer>) {
  return get(toRef(producers, refId))
}

export async function allProducerUsers(refId: RefID<Producer>) {
  return allRelations(producerUsersRel, users, refId)
}

export async function allProducerConsumers(refId: RefID<Producer>) {
  return allRelations(producerConsumersRel, producers, refId)
}

// ────────────────────────────────────────────────────────────────────────────────

export async function createProducer({ userRef, ...rest }: ProducerCreateData) {
  const ref = await add(producers, rest)

  await addRelation(ref, userRef, producerUsersRel, userProducersRel)

  return ref
}

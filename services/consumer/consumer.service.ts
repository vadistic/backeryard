import { add, all, get } from 'typesaurus'

import { userConsumersRel, userProducersRel } from '../user/user.model'
import { addRelation, RefID, toRef } from '../utils'

import {
  Consumer,
  ConsumerCreateData,
  consumerProducersRel,
  consumers,
  consumerUsersRel,
} from './consumer.model'

export async function getAllConsumers() {
  return all(consumers)
}

export async function getProducer(refId: RefID<Consumer>) {
  return get(toRef(consumers, refId))
}

export async function getConsumerUsers(refId: RefID<Consumer>) {
  return all(consumerUsersRel(toRef(consumers, refId)))
}

export async function getConsumerProducers(refId: RefID<Consumer>) {
  return all(consumerProducersRel(toRef(consumers, refId)))
}

// ────────────────────────────────────────────────────────────────────────────────

export async function createConsumer({ userRef, producerRef, ...rest }: ConsumerCreateData) {
  const ref = await add(consumers, rest)

  await addRelation(ref, userRef, consumerUsersRel, userConsumersRel)
  await addRelation(ref, producerRef, consumerProducersRel, userProducersRel)

  return ref
}

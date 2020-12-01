import { collection } from 'typesaurus'

import { Consumer } from '../consumer/consumer.model'
import { Producer } from '../producer/producer.model'
import { relcollection } from '../utils'

export class User {
  email: string
  name?: string
}

export const users = collection<User>('users')

export const userConsumersRel = relcollection<Consumer, User>('consumerRefs', users)

export const userProducersRel = relcollection<Producer, User>('producerRefs', users)

// ────────────────────────────────────────────────────────────────────────────────

export class UserCreateData {
  email: string
  name?: string
}

import { collection, Ref } from 'typesaurus'

import { Consumer } from '../consumer/consumer.model'
import { User } from '../user/user.model'
import { relcollection } from '../utils'

export class Producer {
  name: string
}

export class ProducerCreateData {
  name: string

  userRef: Ref<User>
}

// ────────────────────────────────────────────────────────────────────────────────

export const producers = collection<Producer>('producers')

export const producerUsersRel = relcollection<User, Producer>('userRefs', producers)

export const producerConsumersRel = relcollection<Consumer, Producer>('consumerRefs', producers)

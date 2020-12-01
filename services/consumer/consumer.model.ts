import { collection, Ref } from 'typesaurus'

import { Producer } from '../producer/producer.model'
import type { User } from '../user/user.model'
import { relcollection } from '../utils'

export class Consumer {
  name: string
}

export class ConsumerCreateData {
  name: string

  userRef: Ref<User>
  producerRef: Ref<Producer>
}

export const consumers = collection<Consumer>('consumers')

export const consumerUsersRel = relcollection<User, Consumer>('userRefs', consumers)

export const consumerProducersRel = relcollection<Producer, Consumer>('producerRefs', consumers)

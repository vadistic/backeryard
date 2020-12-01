import { get, all, add } from 'typesaurus'

import { RefID, toRef } from '../utils'

import { User, UserCreateData, users } from './user.model'

export async function getAllUsers() {
  return all(users)
}

export async function getUser(refId: RefID<User>) {
  return get(toRef(users, refId))
}

// ────────────────────────────────────────────────────────────────────────────────

export async function createUser(data: UserCreateData) {
  return add(users, data)
}

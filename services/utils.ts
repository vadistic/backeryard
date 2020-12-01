/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { auth } from 'firebase-admin'
import {
  Collection,
  limit,
  query,
  batch,
  Ref,
  ref,
  Subcollection,
  all,
  getMany,
  subcollection,
  add,
  Doc,
} from 'typesaurus'

import { FirebaseUser } from '../firebase/types'

export type RefID<T> = Ref<T> | string

export function toRef<T>(collection: Collection<T>, refId: RefID<T>) {
  return typeof refId === 'string' ? ref(collection, refId) : refId
}

export interface Relation<T> {
  ref: Ref<T>
}

export function relcollection<M, P>(path: string, parent: Collection<P>) {
  return subcollection<Relation<M>, P>(path, parent)
}

export function toRelation<T>(collection: Collection<T>, refId: RefID<T>): Relation<T> {
  return { ref: toRef(collection, refId) }
}

export async function addRelation<Model, Parent>(
  parentRef: Ref<Parent>,
  targetRef: Ref<Model>,
  rel: Subcollection<Relation<Model>, Parent>,
  back?: Subcollection<Relation<Parent>, Model>,
) {
  await add(rel(parentRef), { ref: targetRef })

  if (back) {
    await add(back(targetRef), { ref: parentRef })
  }
}

export async function allRelations<T, P>(
  sub: Subcollection<Relation<T>, P>,
  target: Collection<T>,
  refId: RefID<T>,
) {
  const ref = sub(refId)
  const relationRefs = await all(ref)

  return getMany(
    target,
    relationRefs.map(ref => ref.data.ref.id),
  )
}

// ────────────────────────────────────────────────────────────────────────────────

export function mapUserRecord(userRecord: auth.UserRecord): FirebaseUser {
  return {
    id: userRecord.uid,
    email: userRecord.email!,
    name: userRecord.displayName,
    verified: userRecord.emailVerified,
  }
}

export async function deleteCollection<T>(
  collection: Collection<T>,
  subs: Subcollection<any, T>[] = [],
) {
  return new Promise((resolve, reject) => {
    deleteCollectionBatch(collection, resolve, subs).catch(reject)
  })
}

async function deleteCollectionBatch<T>(
  collection: Collection<T>,
  resolve: (value?: unknown) => void,
  subs: Subcollection<any, T>[] = [],
) {
  const docs = await query(collection, [limit(100)])

  if (docs.length === 0) {
    resolve()
    return
  }

  const { remove, commit } = batch()

  docs.forEach(doc => {
    remove(doc.ref)
  })

  await commit()

  await deleteSubcollections(docs, subs)

  // recurse on the next process tick, to avoid exploding the stack.
  process.nextTick(() => {
    deleteCollectionBatch(collection, resolve)
  })
}

async function deleteSubcollections<T>(docs: Doc<T>[], subs: Subcollection<any, T>[] = []) {
  const p = docs.flatMap(doc => subs.map(sub => deleteCollection(sub(doc.ref))))

  await Promise.all(p)
}

import cookies from 'js-cookie'

import { FirebaseUser } from './types'

export const AUTH_COOKIE = 'auth'

export function getUserFromCookie(): FirebaseUser | undefined {
  return cookies.getJSON(AUTH_COOKIE)
}

export function setUserCookie(user: FirebaseUser) {
  cookies.set(AUTH_COOKIE, user, {
    // firebase id tokens expire in one hour
    expires: 1 / 24,
  })
}

export function removeUserCookie() {
  cookies.remove(AUTH_COOKIE)
}

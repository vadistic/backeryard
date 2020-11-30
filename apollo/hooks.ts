import { useMemo } from 'react'

import { getApolloClient } from './client'

export function useApollo(initialState?: any) {
  const store = useMemo(() => getApolloClient(initialState), [initialState])
  return store
}

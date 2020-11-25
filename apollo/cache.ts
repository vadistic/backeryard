import { InMemoryCache, InMemoryCacheConfig } from '@apollo/client'

export const cacheConfig: InMemoryCacheConfig = {}

export const cache = new InMemoryCache(cacheConfig)

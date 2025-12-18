// Simple in-memory cache for production
const cache = new Map<string, { data: any; expires: number }>()

export function getCached<T>(key: string): T | null {
  const item = cache.get(key)
  if (!item) return null

  if (Date.now() > item.expires) {
    cache.delete(key)
    return null
  }

  return item.data as T
}

export function setCache(key: string, data: any, ttlSeconds = 300) {
  cache.set(key, {
    data,
    expires: Date.now() + ttlSeconds * 1000,
  })
}

export function clearCache(pattern?: string) {
  if (!pattern) {
    cache.clear()
    return
  }

  for (const key of cache.keys()) {
    if (key.includes(pattern)) {
      cache.delete(key)
    }
  }
}

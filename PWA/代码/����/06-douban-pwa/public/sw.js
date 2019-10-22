const CACHE_NAME = 'cache_v1'
const URLS = [
  '/',
  '/css/index.css',
  '/images/logo.png',
  '/index.js',
  '/manifest.json',
  '/api/getMovie'
]
self.addEventListener('install', async e => {
  // 缓存内容
  const cache = await caches.open(CACHE_NAME)
  await cache.addAll(URLS)
  await self.skipWaiting()
})
self.addEventListener('activate', async e => {
  // 清除旧的缓存
  const keys = await caches.keys()
  keys.forEach(key => {
    // 如果key不等于CACHE_NAME
    if (key !== CACHE_NAME) {
      caches.delete(key)
    }
  })
  await self.clients.claim()
})
self.addEventListener('fetch', e => {
  // 1. 只缓存同源的内容
  const req = e.request
  // http://localhost
  const url = new URL(req.url)
  if (url.origin !== self.origin) {
    return
  }

  if (req.url.includes('/api')) {
    e.respondWith(networkFirst(req))
  } else {
    e.respondWith(cacheFirst(req))
  }
})

// cache优先， 一般适用于静态资源
async function cacheFirst(req) {
  const cache = await caches.open(CACHE_NAME)
  const cached = await cache.match(req)
  // 如果从缓存中得到了
  if (cached) {
    return cached
  } else {
    const fresh = await fetch(req)
    return fresh
  }
}

// 网络优先的数据，如果我们获取到了数据，应该往缓存中存一份
async function networkFirst(req) {
  const cache = await caches.open(CACHE_NAME)
  try {
    const fresh = await fetch(req)
    // 网络优先，获取到的数据，应该再次更新到缓存
    // 把响应的备份存储到缓存中
    cache.put(req, fresh.clone())
    return fresh
  } catch (e) {
    const cached = await cache.match(req)
    return cached
  }
}

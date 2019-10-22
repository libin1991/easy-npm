// 主要就是缓存内容
const CACHE_NAME = 'cache_v2'
self.addEventListener('install', async event => {
  // 开启一个cache, 得到了一个cache对象
  const cache = await caches.open(CACHE_NAME)
  // cache对象就可以存储的资源
  // 等待cache把所有的资源存储起来
  await cache.addAll(['/', '/images/logo.png', '/manifest.json', '/index.css'])
  await self.skipWaiting()
})

// 主要清除就的缓存
self.addEventListener('activate', async event => {
  // 会清除掉旧的资源, 获取到所有的资源的key
  const keys = await caches.keys()
  keys.forEach(key => {
    if (key !== CACHE_NAME) {
      caches.delete(key)
    }
  })
  await self.clients.claim()
})

// 注释：fetch事件会在请求发送的时候触发
// 判断资源是否能够请求成功，如果能够请求成功，就响应成功的结果，如果断网，请求失败了，读取caches缓存即可
self.addEventListener('fetch', async event => {
  // 请求对象
  // 给浏览器响应
  event.respondWith(networkFirst(event.request))
})

// 网络优先
async function networkFirst(req) {
  try {
    // 先从网络读取最新的资源
    const fresh = await fetch(req)
    return fresh
  } catch (e) {
    // 去缓存中读取
    const cache = await caches.open(CACHE_NAME)
    const cached = await cache.match(req)
    return cached
  }
}

const cacheFileNames = [
  '/',
  '/index.html',
  '/style.css',
  '/js/main.js'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('cache-v1').then(cache => {
      cache.addAll(cacheFileNames)
    })
  )
})

self.addEventListener('fetch', event => {
  // event.respondWith(
  //   caches.match(event.request).then(response => {
  //     return response || fetch(event.request)
  //   })
  // )

  event.respondWith(cacheLoad(request))
})

async function cacheLoad(request) {
  const cached = await caches.match(request);
  return cached ?? await fetch(request)
}
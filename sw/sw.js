var CACHE_NAME_ = 'service-cache-by-cqing-v4.0';
var cache_files = [
    './index.html',
    './js/main.js',
    './css/main.css',
    './img/test.png',
    './img/1.jpg',
    './index.sw.js',
    './config.sw.js'
]

// 安装事件
self.addEventListener('install', function (event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME_).then(function (cache) {
            return cache.addAll(cache_files)
        }).catch(e => {
            console.log("安装失败，", e)
        })
    )
})

// 更新事件
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).catch(function () {
            return fetch(event.request);
        }).then(function (res) {
            caches.open(CACHE_NAME_).then(function (cache) {
                cache.put(event.request, res);
            });
            return res.clone();
        }).catch(function () {
            return caches.match('./img/1.jpg');
        })
    )
})

// 更新缓存
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(
                // keyList.map(function (key) {
                //     if (CACHE_NAME_.indexOf(key) === -1) {
                //         return caches.delete(key);
                //     }
                // })
                keyList.map(function (cacheName) {
                    // 如果当前版本和缓存版本不一致
                    if (cacheName !== CACHE_NAME_) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


// self.addEventListener('push', function (event) {
//     console.log('Received a push message', event);
//     var title = 'Yay a message.';
//     var body = 'We have received a push message.';
//     var icon = '/images/icon-192x192.png';
//     var tag = 'simple-push-demo-notification-tag';
//     event.waitUntil(
//         self.registration.showNotification(title, {
//             body: body,
//             icon: icon,
//             tag: tag
//         })
//     );
// });

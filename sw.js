console.log("Hola desde SW")

const CACHE_API_NAME = 'API-v1'
const CACHE_STATIC_NAME = 'STATIC-v1'
const CACHE_DYNAMIC_NAME = 'DYNAMIC-v1'
const CACHE_INMUTABLE_NAME = 'INMUTABLE-v1'

function cleanCache(cacheName, sizeItems) {
    caches.open(cacheName)
        .then(cache => {
            cache.keys().then(keys => {
                if (keys.length >= sizeItems) {
                    cache.delete(keys[0]).then(() => {
                        cleanCache(cacheName, sizeItems)
                    })
                }
            })
        })
}

self.addEventListener('install', (event) => {
    console.log("SW: Install")

    const cacheStatic = caches.open(CACHE_STATIC_NAME)
        .then(cache => {
            cache.addAll([
                './',
                //'./egresos.html',
                //'./historial.html',
                './index.html',
                //'./monedero.html',
                //'./perfil.html',
                './offline.html',
                //'./transaccion.html',
                './js/app.js',
                './js/camera.js',
                //'./js/egresosAngular.js',
                //'./js/historialAngular.js',
                './js/indexAngular.js',
                //'./js/monederoAngular.js',
                //'./js/perfilAngular.js',
                //'./js/transAngular.js',
                './images/badge.png',
                './images/default-image.jpg',
                './images/icon.png',
                './images/ILoveMyMoney.png',
                //'./images/money.png',
                './images/offline.png',
                './images/icons/money-48-48.png',
                './images/icons/money-72-72.png',
                './images/icons/money-96-96.png',
                './images/icons/money-144-144.png',
                './images/icons/money-192-192.png',
                './images/icons/money-512-512.png',
                './manifest.json'
            ])
        })

    const cacheInmuta = caches.open(CACHE_INMUTABLE_NAME)
        .then(cache => {
            cache.addAll([
                'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css',
                'https://pro.fontawesome.com/releases/v5.10.0/css/all.css',
                'https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.js',
                'https://code.jquery.com/jquery-3.5.1.min.js',
                'https://ajax.googleapis.com/ajax/libs/angularjs/1.7.8/angular.min.js',
                'https://ajax.googleapis.com/ajax/libs/angularjs/1.7.8/angular-route.js',
                'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js',
                'https://cdn.jsdelivr.net/npm/sweetalert2@11'
            ])
        })

    event.waitUntil(Promise.all([cacheStatic, cacheInmuta]))
})

self.addEventListener('activate', (event) => {
    console.log("SW: Activate")
})

self.addEventListener('fetch', (event) => {
    const response = fetch(event.request).then(res => {
    
       if(!res){
           return caches.match(event.request)
       }
       
       if(event.request.url.includes('I%E2%99%A5$')){
            if (event.request.method === 'GET') {
                caches.open(CACHE_API_NAME).then(cache => {
                    cache.put(event.request, res)
                })
            }

       }else{
            caches.open(CACHE_DYNAMIC_NAME).then(cache => {
                cache.put(event.request, res)
                cleanCache(CACHE_DYNAMIC_NAME, 5)
            })
       }
      
       return res.clone()
    }).catch(error => {
        if(event.request.headers.get('accept').includes('text/html')){
            return caches.match('./offline.html')
     }else{
            return caches.match(event.request)

        }
    })

    event.respondWith(response)
})


self.addEventListener('push', function (event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    const title = 'ILoveMyMoney';
    const options = {
        body: `${event.data.text()}`,
        icon: 'images/icon.png',
        badge: 'images/badge.png'
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function (event) {
    console.log('[Service Worker] Notification click Received.');

    event.notification.close();

    event.waitUntil(
        clients.openWindow('http://www.utez.edu.mx/')
    );
});
const CACHE_NAME = 'v1_cache_RSA_PWA';

var urlsToCache = [
    './',
    './index.html',
    './main.js',
    './manifest.json',
    './sw.js',
]

self.addEventListener('install', e => {

    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(urlsToCache)
                    .then(() => {
                        self.skipWaiting();
                    })
            })
            .catch(err => console.log('No se ha registrado el cache', err))
    );
});

self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheWhitelist.indexOf(cacheName) == -1) {
                            return cache.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                self.clients.claim(); //Activa la cache en el dispositivo
            })
    );
});

/*
    Evento fetch
    Consigue la informacion de internet... hace una consulta al backend
    cuando se salta de una pagina a otra pagina... por ejemplo
    revisa si ya tiene los recursos en cache y sino los solicita
*/

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if(res){
                return res; //devuelve datos desde cache
            }
            return fetch(e.request); //se hace peticion al servidor en caso de que noo este en cache
        })
    );
});


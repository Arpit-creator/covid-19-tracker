const CACHE_NAME = "covid-19-tracker-cache-v1.1";
const urlsToCache = [
	"/",
	"/style.css",
	"/manifest.json",
	"/bundle.js",
	"/favicon.png",
	"/assets/loading.gif",
	"/assets/logo.png"
];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then((cache) => {
				return cache.addAll(urlsToCache);
			})
	);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request)
			.then((response) => {
				if (response) {
					return response;
				}

				return fetch(event.request);
			}
		)
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((key) => {
					if(key !== CACHE_NAME) {
							return caches.delete(key);
					}
				})
			);
		})
	);
});

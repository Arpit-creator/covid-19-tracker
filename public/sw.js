const CACHE_NAME = "covid-19-tracker-cache-v1.1";
const urlsToCache = [
	"/",
	"/style.css",
	"/manifest.json",
	"/bundle.js",
	"/favicon.png",
	"/assets/loading.gif",
	"/assets/logo.png",
	"https://unpkg.com/react@17.0.1/umd/react.production.min.js",
	"https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js",
	"https://fonts.googleapis.com/css?family=Montserrat&display=swap"
];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then((cache) => {
				return cache.addAll(urlsToCache);
			})
	);
});

self.addEventListener("fetch", (event) => {
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

self.addEventListener("activate", (event) => {
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

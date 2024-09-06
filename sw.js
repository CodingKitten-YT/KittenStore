self.addEventListener('install', (e) => {
  console.log('Service Worker installing.');
  e.waitUntil(
    caches.open('kittenstore').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        'https://unpkg.com/onsenui/css/onsenui.min.css',
        'https://unpkg.com/onsenui/css/onsen-css-components.min.css',
        'https://unpkg.com/onsenui/js/onsenui.min.js'
      ]).catch(error => {
        console.error('Caching failed:', error);
      });
    })
  );
});

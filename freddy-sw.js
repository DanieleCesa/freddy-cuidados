// Service Worker — Cuidados do Freddy
const CACHE = 'freddy-v8';
const ARQUIVOS = [
  './',
  './index.html',
  './freddy-manifest.webmanifest',
  './assets/icon-freddy.svg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(chaves => Promise.all(chaves.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Estratégia: network-first pra HTML/JSON (sempre pega fresh),
// cache-first pra assets estáticos (icones, fontes).
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const isHTML = e.request.mode === 'navigate'
    || url.pathname.endsWith('.html')
    || url.pathname.endsWith('/')
    || url.pathname.endsWith('.webmanifest')
    || url.pathname.endsWith('.js');

  if (isHTML) {
    e.respondWith(
      fetch(e.request).then(fresh => {
        const clone = fresh.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone)).catch(()=>{});
        return fresh;
      }).catch(() => caches.match(e.request))
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(resp => resp || fetch(e.request).then(fresh => {
        const clone = fresh.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone)).catch(()=>{});
        return fresh;
      }).catch(() => resp))
    );
  }
});

// Ao clicar na notificação, abre o app
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientes => {
      for (const c of clientes) {
        if ((c.url.endsWith('/') || c.url.endsWith('/index.html') || c.url.includes('freddy')) && 'focus' in c) return c.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});

// Permite que a página peça pra listar/cancelar notificações agendadas
self.addEventListener('message', async (e) => {
  if (e.data && e.data.tipo === 'limpar-agendadas') {
    const regs = await self.registration.getNotifications({ includeTriggered: false });
    for (const n of regs) n.close();
    e.ports[0] && e.ports[0].postMessage({ ok: true, apagadas: regs.length });
  }
});

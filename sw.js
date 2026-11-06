// Recebe os avisos da Lua, mesmo com o app fechado. Não guarda páginas em cache.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('push', (e) => {
  let aviso = { titulo: '🌙 Lua', corpo: 'Vem me ver!' };
  try { aviso = { ...aviso, ...e.data.json() }; } catch (_) { /* usa o texto padrão */ }
  e.waitUntil(self.registration.showNotification(aviso.titulo, {
    body: aviso.corpo,
    icon: 'icons/icone-192.png',
    badge: 'icons/icone-192.png',
    tag: 'lua',
  }));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((abertas) => {
    const janela = abertas.find((c) => 'focus' in c);
    return janela ? janela.focus() : self.clients.openWindow(self.registration.scope);
  }));
});

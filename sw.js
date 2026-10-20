// PreventIVO service worker: rete prima, cache solo se offline. Così ogni apertura prende l'ultima versione.
const C='preventivo-v1';
self.addEventListener('install',e=>{ self.skipWaiting(); });
self.addEventListener('activate',e=>{ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return;
  e.respondWith(fetch(r,{cache:'no-store'}).then(res=>{ if(res.ok && new URL(r.url).origin===location.origin){ const cp=res.clone(); caches.open(C).then(c=>c.put(r,cp)); } return res; }).catch(()=>caches.match(r)));
});

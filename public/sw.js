
// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  console.log('service worker recieved message', event.data.type)
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.skipWaiting();


self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var action = e.action;

  if (action === 'close') {
    notification.close();
  } else {
    e.target.clients.openWindow('www.google.com')
    // e.clients.openWindow('www.google.com'); // move to target url
    notification.close();
  }
});

self.addEventListener('push', function(event) {
  console.log('pushed', {event})
  const data = event.data.json();

  self.registration.showNotification(data.title, {
    body: data.body
  });
})

console.log('service worker installed')
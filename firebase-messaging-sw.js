importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyA28TDLUqJc-EH10WLYfJ1l7hprVM2-ERE",
  authDomain: "rotaciones-san-jose.firebaseapp.com",
  projectId: "rotaciones-san-jose",
  storageBucket: "rotaciones-san-jose.firebasestorage.app",
  messagingSenderId: "67673680210",
  appId: "1:67673680210:web:a017fd73f38d0a3e48f28b"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const title = (payload.notification && payload.notification.title) || "Rotación vencida";
  const body = (payload.notification && payload.notification.body) || "Hay una rotación pendiente.";
  self.registration.showNotification(title, {
    body: body,
    icon: "icon-192.png",
    badge: "icon-192.png",
    vibrate: [200, 100, 200],
    data: payload.data || {}
  });
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (clientList) {
      for (const client of clientList) {
        if ("focus" in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow("/");
    })
  );
});

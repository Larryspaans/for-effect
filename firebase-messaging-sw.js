// ============================================================================
// public/firebase-messaging-sw.js
// 🔔 Service worker voor web-push (okt 2026)
//
// Dit bestand moet in de map `public/` staan zodat het op het domein-root
// geserveerd wordt (/firebase-messaging-sw.js) — dat is een harde eis van FCM.
//
// ⚠️ EENMALIG INVULLEN: kopieer de firebaseConfig-waarden 1-op-1 uit
// src/firebase.js (het zijn publieke client-waarden, geen geheimen).
// ============================================================================

importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDRMrpzIqTIhScdRtJc775wXrgE5x5pDz8",
  authDomain: "coaching-platform-77639.firebaseapp.com",
  projectId: "coaching-platform-77639",
  storageBucket: "coaching-platform-77639.firebasestorage.app",
  messagingSenderId: "231075823082",
  appId: "1:231075823082:web:1f881fdb2164155b508693",
});

const messaging = firebase.messaging();

// Meldingen die binnenkomen terwijl de (web-)app niet openstaat.
// We sturen `notification` al mee vanaf de server, dus de browser toont die
// meestal zelf — deze handler is het vangnet voor data-only berichten.
messaging.onBackgroundMessage((payload) => {
  const n = (payload && payload.notification) || {};
  if (!n.title) return; // browser heeft 'm dan al zelf getoond
  self.registration.showNotification(n.title, {
    body: n.body || "",
    icon: n.icon || "/icon-192.png",
    badge: "/icon-192.png",
    // ⭐ data meegeven, zodat de tik-handler de deeplink (data.open) kent.
    data: (payload && payload.data) || {},
  });
});

// Tik op de melding → open (of focus) de app. Draagt de melding een deeplink
// (data.open), dan sturen we de app daarheen. AI-coach-push → /?open=aicoach.
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const data = (event.notification && event.notification.data) || {};
  const doel = data.open === "aicoach" ? "/?open=aicoach" : "/";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((lijst) => {
      for (const c of lijst) {
        if ("focus" in c) {
          // Bestaand venster: focussen en (bij een deeplink) laten openen via
          // een bericht dat de app oppikt. Lukt navigate, dan die ook.
          if (doel !== "/") {
            try { c.postMessage({ type: "fe-open", doel: "aicoach" }); } catch (e) {}
            if ("navigate" in c) { try { c.navigate(doel); } catch (e) {} }
          }
          return c.focus();
        }
      }
      return clients.openWindow(doel);
    }),
  );
});

self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : { title: "Workout Reminder", body: "Time to train!" };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/logo192.png",
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/"));
});

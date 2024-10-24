// Firebase config object from your Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyA3MvKes_d6TRGpu00JYgDpMNP8xDVTvwk",
  authDomain: "pegion-18fd4.firebaseapp.com",
  projectId: "pegion-18fd4",
  storageBucket: "pegion-18fd4.appspot.com",
  messagingSenderId: "204056403715",
  appId: "1:204056403715:web:25ba21906b4818441a1336",
  measurementId: "G-Z9J8XE59K3",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = firebase.messaging();

// Request permission to send notifications
Notification.requestPermission()
  .then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      // Get the FCM token
      return messaging.getToken();
    } else {
      console.error("Unable to get permission to notify.");
    }
  })
  .then((token) => {
    if (token) {
      console.log("FCM Token:", token);
      document.getElementById("hehe").innerHTML = token;
      // Optionally, send the token to your backend
      alert(token);
    }
  })
  .catch((err) => {
    alert("error");
    console.error("Error getting notification permission or token:", err);
  });

// Handle foreground messages
messaging.onMessage((payload) => {
  console.log("Message received. ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  // Display notification in the browser
  new Notification(notificationTitle, notificationOptions);
});

// Register the service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js") // Make sure the path is correct
    .then(function (registration) {
      console.log(
        "Service Worker registration successful with scope: ",
        registration.scope
      );
    })
    .catch(function (err) {
      console.log("Service Worker registration failed: ", err);
    });
}

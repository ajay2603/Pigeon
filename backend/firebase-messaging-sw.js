importScripts(
  "https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyA3MvKes_d6TRGpu00JYgDpMNP8xDVTvwk",
  authDomain: "pegion-18fd4.firebaseapp.com",
  projectId: "pegion-18fd4",
  storageBucket: "pegion-18fd4.appspot.com",
  messagingSenderId: "204056403715",
  appId: "1:204056403715:web:25ba21906b4818441a1336",
  measurementId: "G-Z9J8XE59K3",
};

// Initialize Firebase in the service worker
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

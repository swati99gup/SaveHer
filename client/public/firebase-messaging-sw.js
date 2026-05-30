importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({

  apiKey: "AIzaSyBZimPa0ETsBnsGoCcAf9UDelPx2ujgToE",

  authDomain:
    "safeher-ddaad.firebaseapp.com",

  projectId:
    "safeher-ddaad",

  storageBucket:
    "safeher-ddaad.firebasestorage.app",

  messagingSenderId:
    "325144050834",

  appId:
    "1:325144050834:web:b196b848d344d284f3ba4b"
});

const messaging =
  firebase.messaging();

messaging.onBackgroundMessage(

  (payload) => {

    self.registration.showNotification(

      payload.notification.title,

      {
        body:
          payload.notification.body
      }
    );
  }
);
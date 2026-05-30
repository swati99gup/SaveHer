import { initializeApp }
from "firebase/app";

import {
  getMessaging
}
from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBZimPa0ETsBnsGoCcAf9UDelPx2ujgToE",
  authDomain: "safeher-ddaad.firebaseapp.com",
  projectId: "safeher-ddaad",
  storageBucket: "safeher-ddaad.firebasestorage.app",
  messagingSenderId: "325144050834",
  appId: "1:325144050834:web:b196b848d344d284f3ba4b",
  measurementId: "G-7YN00Y4ZS9"
};
const app =
  initializeApp(firebaseConfig);

export const messaging =
  getMessaging(app);
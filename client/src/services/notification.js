import {getToken} from "firebase/messaging";
import {
  onMessage
}
from "firebase/messaging";
import { messaging }
from "../firebase";

export const requestPermission =
async () => {

  try {

    console.log(
      "Requesting Permission..."
    );

    const permission =

      await Notification.requestPermission();

    if (
      permission !== "granted"
    ) {

      console.log(
        "Permission Denied"
      );

      return;
    }

    console.log(
      "Permission Granted"
    );

    const registration =

      await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );

    // WAIT FOR ACTIVE SERVICE WORKER

    await navigator.serviceWorker.ready;

    console.log(
      "Service Worker Active"
    );

    const token =

      await getToken(

        messaging,

        {

          vapidKey:
            "BOfKbiv4YoGpvvKMOg0lPjc58Wx404EIgmv1Meab5_sm70TepRcMNK9cf9k8x12n3MPtEllG7n6FmB-Uk0w6ccM",

          serviceWorkerRegistration:
            registration
        }
      );

    console.log(
      "FCM TOKEN:",
      token
    );
const authToken =
  localStorage.getItem("token");

await fetch(

  "https://saveher.onrender.com/api/fcm/save-token",

  {

    method: "POST",

    headers: {

      "Content-Type":
        "application/json",

      Authorization:
        authToken
    },

    body: JSON.stringify({

      token
    })
  }
);
    return token;

  } catch (err) {

    console.log(
      "FCM ERROR:",
      err
    );
  }
};

onMessage(

  messaging,

  (payload) => {

    console.log(
      "Foreground Message:",
      payload
    );

    new Notification(

      payload.notification.title,

      {
        body:
          payload.notification.body
      }
    );
  }
);
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCmv5BCzbs962Q_v3l6J4ZNXQXPabqBzWA",
  authDomain: "clocker-84a50.firebaseapp.com",
  projectId: "clocker-84a50",
  storageBucket: "clocker-84a50.appspot.com",
  messagingSenderId: "795363865532",
  appId: "1:795363865532:web:0c799f22c91eabcafa31b9"
};

const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});

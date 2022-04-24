// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import { getToken, onMessage} from "firebase/messaging"
import { getMessaging } from "firebase/messaging/sw";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmv5BCzbs962Q_v3l6J4ZNXQXPabqBzWA",
  authDomain: "clocker-84a50.firebaseapp.com",
  projectId: "clocker-84a50",
  storageBucket: "clocker-84a50.appspot.com",
  messagingSenderId: "795363865532",
  appId: "1:795363865532:web:0c799f22c91eabcafa31b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 

export const messaging = getMessaging(app)

export const fetchToken = (setToken) => {
  return getToken(messaging, { vapidKey: 'BMGEYqHYNgqVv-hZSEOgW6vXX8iKYp1JjdwR-_RciHvNnLtgH3LjoPc3p13K7bHYc4eGlZwZY35_9g4KSD1_pE8' }).then((currentToken) => {
    if (currentToken) {
      console.log("token", currentToken)
      setToken(currentToken)
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  });
}

export const auth = getAuth(app)
export const db = getFirestore(app)
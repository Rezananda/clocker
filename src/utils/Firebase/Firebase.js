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
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
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
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js'
// // import {getMessaging, onBackgroundMessage} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging.js'

// import { initializeApp } from "firebase/compat/app";
// import { getMessaging, onBackgroundMessage } from "firebase/compat/messaging";

// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");


const firebaseConfig = {
  apiKey: "AIzaSyCmv5BCzbs962Q_v3l6J4ZNXQXPabqBzWA",
  authDomain: "clocker-84a50.firebaseapp.com",
  projectId: "clocker-84a50",
  storageBucket: "clocker-84a50.appspot.com",
  messagingSenderId: "795363865532",
  appId: "1:795363865532:web:0c799f22c91eabcafa31b9"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

// eslint-disable-next-line no-undef
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
  };


  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
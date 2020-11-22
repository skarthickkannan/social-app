import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAeA4d3YNU3h0B8QpnY30KMIulTCj_SdQ",
  authDomain: "mern-pro-3cd58.firebaseapp.com",
  databaseURL: "https://mern-pro-3cd58.firebaseio.com",
  projectId: "mern-pro-3cd58",
  storageBucket: "mern-pro-3cd58.appspot.com",
  messagingSenderId: "179389604347",
  appId: "1:179389604347:web:bbea07034697f5a241ab5e",
  measurementId: "G-EB8JB872T3",
};

const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;

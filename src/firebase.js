import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAG9qP7fW3giOruC3yeFgfhK2GiqCjyI9M",
  authDomain: "messenger-29ddc.firebaseapp.com",
  databaseURL: "https://messenger-29ddc.firebaseio.com",
  projectId: "messenger-29ddc",
  storageBucket: "messenger-29ddc.appspot.com",
  messagingSenderId: "900988194231",
  appId: "1:900988194231:web:906a5c690a84e0cecb6c32",
  measurementId: "G-HCQLXJQ2WX",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export default db;
export const auth = firebase.auth();
export const storage = firebase.storage();

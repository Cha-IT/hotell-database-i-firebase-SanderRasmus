import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA_mcABuhsVwrayymfL71a1zvixmpjOASw",
  authDomain: "hoteldb-7c2df.firebaseapp.com",
  projectId: "hoteldb-7c2df",
  storageBucket: "hoteldb-7c2df.appspot.com",
  messagingSenderId: "291243911021",
  appId: "1:291243911021:web:a16891073871ec13815c64",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

export { db };

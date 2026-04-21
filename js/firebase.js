import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
getFirestore,
collection,
addDoc,
getDocs,
deleteDoc,
doc,
updateDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyAoXa1Bpp-kHbDx58s17TEg8G25Y9Sm3Rg",
  authDomain: "espaco-aline-oliveira.firebaseapp.com",
  projectId: "espaco-aline-oliveira",
  storageBucket: "espaco-aline-oliveira.firebasestorage.app",
  messagingSenderId: "1092718565399",
  appId: "1:1092718565399:web:a6e9cb883ada13255ee452",
  measurementId: "G-QX9W9X5LVC"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export {
auth,
db,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged,
collection,
addDoc,
getDocs,
deleteDoc,
doc,
updateDoc
};
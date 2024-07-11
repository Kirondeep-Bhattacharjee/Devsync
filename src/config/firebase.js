import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAkcpux7vG35PUKg8E8lBkfkSP4ulj8G-w",
  authDomain: "filesystem-c600b.firebaseapp.com",
  projectId: "filesystem-c600b",
  storageBucket: "filesystem-c600b.appspot.com",
  messagingSenderId: "569990107812",
  appId: "1:569990107812:web:a26d82dce9894a288c8c31",
  measurementId: "G-9G47RNVEFZ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };
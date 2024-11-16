// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2xnv18KsYECXGSdPrMN4kTmxtCZFK-aA",
  authDomain: "sehpaathi-d2a02.firebaseapp.com",
  databaseURL: "https://sehpaathi-d2a02-default-rtdb.firebaseio.com",
  projectId: "sehpaathi-d2a02",
  storageBucket: "sehpaathi-d2a02.firebasestorage.app",
  messagingSenderId: "837154804067",
  appId: "1:837154804067:web:bafc62cb6d37f7358e4356",
  measurementId: "G-ZJFZ0D3QG4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();

provider.addScope("https://www.googleapis.com/auth/drive.file");

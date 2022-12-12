import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBO_ZutnMvMzYMFhuBQjwRu6ohgt5gjASI",
  authDomain: "todolist-irvanma.firebaseapp.com",
  projectId: "todolist-irvanma",
  storageBucket: "todolist-irvanma.appspot.com",
  messagingSenderId: "908557872643",
  appId: "1:908557872643:web:f802aeea95a75c20406836",
  measurementId: "G-T56XNC2C5P",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3dXSZ-s-qSreADq1b6tnEZ5WqX56Q34s",
  authDomain: "sms-1-686db.firebaseapp.com",
  projectId: "sms-1-686db",
  storageBucket: "sms-1-686db.appspot.com",
  messagingSenderId: "872106259",
  appId: "1:872106259:web:da2ab80b02722b012372e6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

import firebase from 'firebase';

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.FIREBASE_DATABASE_URL,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID
// };

const firebaseConfig = {

  apiKey: "AIzaSyBZnNMWVl7bdkLZ_o3p-uMrm0okC-9p3ww",
  authDomain: "expensify-67a5f.firebaseapp.com",
  databaseURL: "https://expensify-67a5f-default-rtdb.firebaseio.com",
  projectId: "expensify-67a5f",
  storageBucket: "expensify-67a5f.appspot.com",
  messagingSenderId: "426920356032",
  appId: "1:426920356032:web:61282ecbfb2fe2c47f6525",
  measurementId: "G-V2CQSFCC7M"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {database, firebase, googleAuthProvider};


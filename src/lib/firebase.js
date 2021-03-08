const config = {
  apiKey: "AIzaSyDxzNhSQoulR2qfHvc9Yncvyqjg00tBAys",
  authDomain: "instagram-cl-a0c05.firebaseapp.com",
  projectId: "instagram-cl-a0c05",
  storageBucket: "instagram-cl-a0c05.appspot.com",
  messagingSenderId: "353571672102",
  appId: "1:353571672102:web:599424b144ffc4cbb456e7",
  measurementId: "G-T5M3BZYGRD",
};

const firebase = window.firebase.initializeApp(config);

// Allow us access to array methods.
const { FieldValue } = window.firebase.firestore;

export { firebase, FieldValue };

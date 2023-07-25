const firebaseConfig = {
  apiKey: "AIzaSyDldjqrFjuk4UtnKbuCrIIft2NeGNPYZbw",
  authDomain: "to-do-web-8a77e.firebaseapp.com",
  projectId: "to-do-web-8a77e",
  storageBucket: "to-do-web-8a77e.appspot.com",
  messagingSenderId: "584783784721",
  appId: "1:584783784721:web:080856a9b2f8275b7ebab0",
  measurementId: "G-6F0QLWT2KX"
};
firebase.initializeApp(firebaseConfig);

firebase.analytics();
var db = firebase.firestore();

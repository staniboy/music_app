import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-sBkBBQlRzwYJAY-I4d92v_3FuZOBsFE",
  authDomain: "musicapp-562b0.firebaseapp.com",
  projectId: "musicapp-562b0",
  storageBucket: "musicapp-562b0.appspot.com",
  messagingSenderId: "627604728983",
  appId: "1:627604728983:web:2bed495dcc4c930a3a8dd2",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

db.enablePersistence().catch((err) => console.log(err));

const usersCollection = db.collection("users");
const songsCollection = db.collection("songs");
const commentsCollection = db.collection("comments");

export {
  auth,
  db,
  usersCollection,
  songsCollection,
  commentsCollection,
  storage,
};

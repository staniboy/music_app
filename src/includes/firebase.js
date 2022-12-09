import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-sBkBBQlRzwYJAY-I4d92v_3FuZOBsFE",
  authDomain: "musicapp-562b0.firebaseapp.com",
  projectId: "musicapp-562b0",
  storageBucket: "musicapp-562b0.appspot.com",
  messagingSenderId: "627604728983",
  appId: "1:627604728983:web:2bed495dcc4c930a3a8dd2",
};

export default firebase.initializeApp(firebaseConfig);

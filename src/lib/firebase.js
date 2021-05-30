import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

//import { seedDatabase } from "../seed";

const config = {
  apiKey: "AIzaSyAGmI3joHR9TeQcBXODZ3yoAy8KUrQbBGA",
  authDomain: "todo-eb83c.firebaseapp.com",
  projectId: "todo-eb83c",
  storageBucket: "todo-eb83c.appspot.com",
  messagingSenderId: "332464153608",
  appId: "1:332464153608:web:79a2df5a06a9de38c71dbd",
  measurementId: "G-LELELC0ZWN",
};

const firebase = Firebase.initializeApp(config);

const { FieldValue } = Firebase.firestore;
//seedDatabase(firebase);
export { firebase, FieldValue };

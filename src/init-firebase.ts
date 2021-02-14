import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"
import { firebaseConfig } from "./firebase.config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

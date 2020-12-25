import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDV21xgCU6U8p10Au3NEhQx_LTZ1_H-W-A",
  authDomain: "julie-s-clothing.firebaseapp.com",
  projectId: "julie-s-clothing",
  storageBucket: "julie-s-clothing.appspot.com",
  messagingSenderId: "272003411432",
  appId: "1:272003411432:web:b16b3dedc69f24cdf6085d",
  measurementId: "G-4NGLS9PWW5",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
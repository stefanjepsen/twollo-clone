//import { boot } from 'quasar/wrappers'

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app"
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// Add the Firebase products that you want to use
//import "firebase/auth"
import "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAOeLkiNq-uKsxxUGyi5--k2JYq7KXUUFE",
  authDomain: "vue-twollo.firebaseapp.com",
  projectId: "vue-twollo",
  storageBucket: "vue-twollo.appspot.com",
  messagingSenderId: "1090315618188",
  appId: "1:1090315618188:web:929cbf7386aabbe10078a9"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export { db }

/* // "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... }) => {
  // something to do
})
 */
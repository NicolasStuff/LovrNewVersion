import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCOJa-Vicu2U9ot0PZ0zZNyVi4yVF3mFMQ",
    authDomain: "lovrnewversion.firebaseapp.com",
    databaseURL: "https://lovrnewversion.firebaseio.com",
    projectId: "lovrnewversion",
    storageBucket: "lovrnewversion.appspot.com",
    messagingSenderId: "1008356077961",
    appId: "1:1008356077961:web:23e4ddabbb6d90083e7158",
    measurementId: "G-1VPWV9B27Q"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()
const database = firebase.database()

export {db, auth, database}